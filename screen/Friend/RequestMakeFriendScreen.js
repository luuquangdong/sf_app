import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

import { answerRequest, getListRequestFriend } from "../../apis/friendApi";
import EmptyComponent from "../../component/EmptyComponent";
import TileConfirm from "../../component/TileConfirm";
import { userState } from "../../recoil/atoms/userState";

const RequestMakeFriendScreen = ({ navigation }) => {
  const [me, setMe] = useRecoilState(userState);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefresh] = useState(false);

  const handleAcceptPressed = async (userId) => {
    try {
      await answerRequest(userId, true);
      setMe({ ...me, friendIds: [...me.friendIds, userId] });
      fetchData();
    } catch (err) {
      console.log({ err });
    }
  };

  const handleCancelPressed = async (userId) => {
    try {
      await answerRequest(userId, false);
      fetchData();
    } catch (err) {
      console.log({ err });
    }
  };

  const handleRefreshed = async () => {
    setRefresh(true);
    try {
      const data = await getListRequestFriend();
      setUsers(data);
      setRefresh(false);
    } catch (err) {
      setRefresh(false);
      console.log({ err });
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getListRequestFriend();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TileConfirm
            user={item}
            onAcceptPressed={handleAcceptPressed}
            onCancelPressed={handleCancelPressed}
          />
        )}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.phoneNumber}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        ListEmptyComponent={
          !loading && (
            <EmptyComponent text="Hiện bạn không có lời mời kết bạn nào" />
          )
        }
        onRefresh={handleRefreshed}
        refreshing={refreshing}
      />
    </View>
  );
};

export default RequestMakeFriendScreen;

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
