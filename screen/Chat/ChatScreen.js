import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import ZoomItem from "../../component/Chat/ZoomItem";
import { chatState } from "../../recoil/atoms/chatState";
import { userState } from "../../recoil/atoms/userState";
import EmptyComponent from "../../component/EmptyComponent";

export default function MessageScreen() {
  const [rooms, setRooms] = useRecoilState(chatState);
  const user = useRecoilValue(userState);

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={({ item }) => (
          <ZoomItem room={item} meId={user.phoneNumber} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyComponent text="Bạn hiện không có tin nhắn nào" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
