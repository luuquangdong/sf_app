import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useRecoilState } from "recoil";
import { useFocusEffect } from "@react-navigation/native";

import { getListPost } from "../apis/postApi";
import CommentBottomSheet from "../component/Comment/CommentBottomSheet";
import LocalErrorBoundary from "../component/LocalErrorBoudary";
import Menu2 from "../component/Post/Menu2";
import PostItem from "../component/Post/PostItem";
import ReportPostMenu from "../component/Post/ReportPostMenu";
import { dataBackState } from "../recoil/atoms/dataBackState";
import MyHeader from "../component/MyHeader";
import EmptyComponent from "../component/EmptyComponent";

const Separator = () => <View style={styles.separator}></View>;

const SIZE = 10;

export default function HomeScreen({ navigation }) {
  const [dataBack, setDataBack] = useRecoilState(dataBackState);

  const [isShowMenu, setShowMenu] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPostId, setLastPostId] = useState("");
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [isShowReport, setShowReport] = useState(false);

  const selectedItemRef = useRef(null);
  const sheetRef = useRef(null);

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

  const handleEndReach = ({ distanceFromEnd }) => {
    console.log(distanceFromEnd);
    // if (distanceFromEnd < 200 && distanceFromEnd > -200)
    fetchData();
  };

  const fetchData = async () => {
    if (endOfData || loading) return;

    setLoading(true);

    try {
      const data = await getListPost(SIZE, lastPostId);
      setPosts([...posts, ...data]);
      if (data.length > 0) setLastPostId(data[data.length - 1].id);

      setEndOfData(data.length < SIZE);
    } catch (err) {
      console.log({ err });
    }

    setLoading(false);
  };

  const handleCreatePostPressed = useCallback(
    () => navigation.navigate("CreatePost"),
    []
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getListPost(SIZE, null);
      setPosts([...data]);
      if (data.length > 0) setLastPostId(data[data.length - 1].id);

      setEndOfData(data.length < SIZE);
    } catch (err) {
      console.log({ err });
    }

    setRefreshing(false);
  };

  const removePost = (postId) => {
    const index = posts.findIndex((p) => p.id === postId);
    setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (dataBack) {
  //     setPosts([dataBack, ...posts]);
  //     setDataBack(null);
  //   }
  // }, [dataBack]);

  useFocusEffect(
    React.useCallback(() => {
      if (!dataBack) return;
      setPosts([dataBack, ...posts]);
      setDataBack(null);
    }, [dataBack])
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={posts}
        // ListHeaderComponent={<HeaderCreatePost navigation={navigation} />}
        ListHeaderComponent={
          <>
            <Separator />
            <MyHeader title="Bài viết mới" onPress={handleCreatePostPressed} />
            <Separator />
          </>
        }
        ListFooterComponent={
          <Footer
            length={posts.length}
            loading={loading}
            endOfData={endOfData}
          />
        }
        ListEmptyComponent={
          !loading && <EmptyComponent text="Chưa có bài viết nào!" />
        }
        ItemSeparatorComponent={Separator}
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.01}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            openComment={handleOpenComment}
            onOptionPress={handleOptionPress}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
}

const Footer = ({ loading, endOfData, length }) => {
  return (
    <>
      {loading ? <ActivityIndicator /> : null}
      {endOfData && length !== 0 && (
        <View style={styles.footer}>
          <Text>
            Không còn bài viết, hãy kết thêm bạn để xem thêm được nhiều bài viết
            hơn nữa!
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  footer: {
    marginTop: 8,
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 10,
  },
});
