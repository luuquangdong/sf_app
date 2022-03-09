import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import { getFriends } from "../../apis/friendApi";
import EmptyComponent from "../../component/EmptyComponent";
import FriendItem2 from "../../component/FindFriend/FriendItem2";

const PickFriendForChatScreen = () => {
  const me = useRecoilValue(userState);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getFriends(me.phoneNumber);
      setFriends(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };

  useEffect(fetchData, [me]);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => <FriendItem2 friend={item} />}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.phoneNumber}
        ListEmptyComponent={
          !loading && <EmptyComponent text="Bạn chưa có người bạn nào" />
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        // onRefresh={handleRefresh}
        // refreshing={refreshing}
      />
    </View>
  );
};

export default PickFriendForChatScreen;

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    borderBottomWidth: 0.5,
    borderColor: "#DDD",
  },
});
