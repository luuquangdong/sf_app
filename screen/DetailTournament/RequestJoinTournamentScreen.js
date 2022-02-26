import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { useRecoilState } from "recoil";

import { tournamentState } from "../../recoil/atoms/tournamentState";
import TileConfirm from "../../component/TileConfirm";
import EmptyComponent from "../../component/EmptyComponent";
import { getListUser } from "../../apis/userApi";
import { answerRequest } from "../../apis/tournamentApi";

const RequestJoinTournamentScreen = () => {
  const [tournament, setTournament] = useRecoilState(tournamentState);
  const [requesters, setRequesters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getListUser({
        userIds: tournament.requesterIds ?? [],
      });
      setRequesters(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptPressed = async (userId) => {
    try {
      await answerRequest({
        userId: userId,
        tournamentId: tournament.id,
        agree: true,
      });
      setTournament({
        ...tournament,
        requesterIds:
          tournament.requesterIds?.filter((id) => id !== userId) ?? [],
        participantIds: [...tournament.participantIds, userId],
      });
    } catch (err) {
      console.log({ err });
    }
  };

  const handleCancelPressed = async (userId) => {
    try {
      await answerRequest({
        userId: userId,
        tournamentId: tournament.id,
        agree: false,
      });
      setTournament({
        ...tournament,
        requesterIds:
          tournament.requesterIds?.filter((id) => id !== userId) ?? [],
      });
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(fetchData, [tournament]);

  return (
    <View style={styles.container}>
      <FlatList
        data={requesters}
        renderItem={({ item }) => (
          <TileConfirm
            user={item}
            onAcceptPressed={handleAcceptPressed}
            onCancelPressed={handleCancelPressed}
          />
        )}
        keyExtractor={(item) => item.phoneNumber}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<EmptyComponent text={"Trống"} />}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

const Separator = () => <View style={{ height: 4 }} />;

export default RequestJoinTournamentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
