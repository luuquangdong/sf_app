import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Separator from "../../component/Separator";
import TournamentItem from "../../component/Tournament/TournamentItem";
import { getTournamentsJoined } from "../../apis/tournamentApi";
import EmptyComponent from "../../component/EmptyComponent";

const MyTournamentsScreen = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getTournamentsJoined();
      setTournaments(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchData, []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TournamentItem tournament={item} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <EmptyComponent text="Bạn hiện không tham gia giải đấu nào" />
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

export default MyTournamentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
