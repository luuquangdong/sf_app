import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { deleteFriend, requestFriend } from "../../apis/friendApi";
import { getListPostOfUser } from "../../apis/postApi";
import { getUserInfo } from "../../apis/userApi";
import CommentBottomSheet from "../../component/Comment/CommentBottomSheet";
import LocalErrorBoundary from "../../component/LocalErrorBoudary";
import Menu2 from "../../component/Post/Menu2";
import PostItem from "../../component/Post/PostItem";
import ReportPostMenu from "../../component/Post/ReportPostMenu";
import Profile from "../../component/Profile";
import Separator from "../../component/Separator";
import TextButton from "../../component/TextButton";
import { userState } from "../../recoil/atoms/userState";

const DetailUserInfoScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isShowMenu, setShowMenu] = useState(false);
  const [isShowReport, setShowReport] = useState(false);

  const selectedItemRef = useRef(null);
  const sheetRef = useRef(null);

  const me = useRecoilValue(userState);

  const removePost = (postId) => {
    const index = posts.findIndex((p) => p.id === postId);
    setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
  };

  const handleOpenComment = useCallback((post) => {
    selectedItemRef.current = post;
    sheetRef.current.snapToIndex(0);
  }, []);

  const showReport = useCallback(() => {
    setShowReport(true);
  }, []);

  const hideReport = useCallback(() => {
    setShowReport(false);
  }, []);

  const hideMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleOptionPress = useCallback((post) => {
    selectedItemRef.current = post;
    setShowMenu(true);
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await getUserInfo(userId);
      setUser(userRes);
      console.log(userRes);
      const postRes = await getListPostOfUser(userId);
      setPosts(postRes);
    } catch (err) {
      console.log({ err });
    }
  };

  const handleEditInfoPress = () => {
    navigation.navigate("EditUserInfo");
  };

  const handleRequest = async () => {
    const rs = await requestFriend({
      userIdSent: me.phoneNumber,
      userIdReceive: user.phoneNumber,
    });
    setUser({ ...user, requestedFriend: rs.requested });
  };

  const handleDeleteFriend = async () => {
    await deleteFriend(user.phoneNumber);
    setUser({ ...user, friend: false });
  };

  const handleMessagePress = async () => {
    if (!user) return;
    navigation.navigate("DetailChat", {
      title: user?.name ?? "X",
      guest: { id: user?.phoneNumber, name: user?.name, avatar: user?.avatar },
    });
  };

  // useEffect(() => {
  //   fetchData();
  // }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#FFF" }}>
        <Profile user={user} />
        <View style={styles.actions}>
          {user !== null && user?.canEdit ? (
            <TextButton onPress={handleEditInfoPress} text="Sửa thông tin" />
          ) : (
            <>
              {user?.friend ? (
                <TextButton onPress={handleDeleteFriend} text="Xóa bạn" />
              ) : (
                <TextButton
                  onPress={handleRequest}
                  text={user?.requestedFriend ? "Hủy yêu cầu" : "Kết bạn"}
                />
              )}
              <TextButton onPress={handleMessagePress} text="Nhắn tin" />
            </>
          )}
        </View>
        <Space />
        <View style={styles.diary}>
          <Text style={styles.header}>Danh sách bài viết</Text>
          {user !== null &&
            posts !== null &&
            posts.map((item) => {
              return (
                <View key={item?.id}>
                  <PostItem
                    post={item}
                    openComment={handleOpenComment}
                    onOptionPress={handleOptionPress}
                  />
                  <Separator />
                </View>
              );
            })}
          {(user === null || posts?.length === 0) && (
            <View>
              <Text style={{ textAlign: "center" }}>Không có bài viết nào</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Menu2
        isShow={isShowMenu}
        hide={hideMenu}
        post={selectedItemRef.current}
        showReport={showReport}
        removePost={removePost}
      />
      <ReportPostMenu
        isShow={isShowReport}
        hide={hideReport}
        post={selectedItemRef.current}
      />
      <LocalErrorBoundary>
        <CommentBottomSheet ref={sheetRef} />
      </LocalErrorBoundary>
    </View>
  );
};

export default DetailUserInfoScreen;

const Space = () => <View style={{ height: 12 }} />;

const Line = () => (
  <View style={{ paddingHorizontal: 16 }}>
    <View style={{ borderBottomColor: "#DDD", borderBottomWidth: 0.5 }} />
  </View>
);

const styles = StyleSheet.create({
  userInfo: {
    alignItems: "center",
    paddingVertical: 24,
  },
  nameTxt: {
    fontWeight: "bold",
  },
  sportInfo: {
    padding: 12,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    color: "#5F4BB6",
    marginBottom: 4,
  },
  label: {
    color: "#777",
    fontWeight: "600",
  },
  diary: {
    marginTop: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
