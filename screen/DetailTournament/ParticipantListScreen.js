import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRecoilValue } from "recoil";
import { tournamentState } from "../../recoil/atoms/tournamentState";
import { Feather } from "@expo/vector-icons";
import { getListUser } from "../../apis/userApi";
import EmptyComponent from "../../component/EmptyComponent";
import { deleteParticipant } from "../../apis/tournamentApi";

const ParticipantListScreen = ({ navigation }) => {
  const tournament = useRecoilValue(tournamentState);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleItemPressed = (userId) => {
    navigation.navigate("UserInfo", { userId: userId });
  };

  const handleDeleteParticipant = (participantId) => {
    const index = participants.findIndex((p) => p.id === participantId);
    if (index === -1) return;
    setParticipants([
      ...participants.splice(0, index),
      ...participants.splice(index + 1),
    ]);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getListUser({
        userIds: tournament.participantIds ?? [],
      });
      setParticipants(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchData, [tournament]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={participants}
        renderItem={({ item }) => (
          <ParticipantItem
            player={item}
            onPress={handleItemPressed}
            canEdit={tournament.canEdit}
            deleteParticipantId={handleDeleteParticipant}
            tournamentId={tournament.id}
          />
        )}
        keyExtractor={(item) => item.phoneNumber}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          !loading && <EmptyComponent text="Ch??a c?? th??nh vi??n n??o" />
        }
      />
    </View>
  );
};

const ParticipantItem = ({
  player,
  canEdit,
  onPress,
  deleteParticipantId,
  tournamentId,
}) => {
  const handleDeleteParticipant = async () => {
    try {
      await deleteParticipant(tournamentId, player.id);
      deleteParticipantId(player.id);
    } catch (err) {
      console.log({ err });
      Alert.alert("C?? l???i x???y ra, x??a th???t b???i");
    }
  };

  const createConfirmAlert = () =>
    Alert.alert(
      "X??a ng?????i ch??i",
      "B???n c?? ch???c mu???n x??a ng?????i ch??i kh???i danh s??ch kh??ng?",
      [
        {
          text: "H???y",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "?????ng ??", onPress: handleDeleteParticipant },
      ]
    );
  const handlePressed = () => {
    if (onPress) onPress(player.phoneNumber);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handlePressed}>
        <Text>{player.name}</Text>
      </TouchableOpacity>
      <Spacer />
      {canEdit && (
        <TouchableOpacity onPress={createConfirmAlert}>
          <Feather name="x-circle" size={20} color="#777" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Separator = () => <View style={{ height: 4 }} />;
const Spacer = () => <View style={{ flex: 1 }} />;

export default ParticipantListScreen;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
