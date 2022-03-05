import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import { getFriends } from "../../apis/friendApi";
import EmptyComponent from "../../component/EmptyComponent";
import FriendItem from "../../component/FindFriend/FriendItem";
import { userState } from "../../recoil/atoms/userState";

const MyFriendsScreen = () => {
  const me = useRecoilValue(userState);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getFriends(me.phoneNumber);
      setFriends(data);
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
      console.log({ err });
    }
  };

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
  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => <FriendItem friend={item} />}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.phoneNumber}
        ListEmptyComponent={
          !loading && <EmptyComponent text="Bạn chưa có người bạn nào" />
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default MyFriendsScreen;

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
