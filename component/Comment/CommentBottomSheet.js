import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRecoilValue } from "recoil";
import { currentPostState } from "../../recoil/atoms/currentPostState";
import CommentItem from "./CommentItem";
import { getComments, getListComment } from "../../apis/commentApi";
import CreateComment from "./CreateComment";
import EmptyComponent from "../EmptyComponent";
import TextButton from "../TextButton";

const SIZE = 10;

const CommentBottomSheet = React.forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "90%"], []);
  const post = useRecoilValue(currentPostState);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

  const addComment = async (newComment) => {
    setComments([...comments, newComment]);
  };

  const fetchMoreData = async () => {
    if (endOfData) return;
    setLoading(true);
    try {
      const data = await getComments(post?.id, comments?.[0]?.id, SIZE);
      setComments([...data, ...comments]);
      const isEnd = data.length < SIZE;
      setEndOfData(isEnd);
    } catch (err) {
      console.log(err?.response?.data);
    }
    setLoading(false);
  };

  // const fetchNewData = async () => {
  //   setComments([]);
  //   setLoading(true);
  //   setPage(0);
  //   setEndOfData(false);
  //   try {
  //     // console.log({ post: post?.id, page, SIZE });
  //     const data = await getListComment(post?.id, 0, SIZE);
  //     // const data = await getComments(post?.id, null, SIZE);
  //     setComments([...data]);
  //     const isEnd = data.length < SIZE;
  //     setPage(isEnd ? page : page + 1);
  //     setEndOfData(isEnd);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLoading(false);
  // };

  const fetchNewData = async () => {
    setComments([]);
    setLoading(true);
    setEndOfData(false);
    try {
      const data = await getComments(post?.id, null, SIZE);
      setComments([...data]);
      setEndOfData(data.length < SIZE);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(fetchNewData, [post]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <BottomSheetFlatList
        data={comments}
        keyExtractor={(i) => i.id}
        renderItem={({ item, index }) =>
          index === 0 && !endOfData ? (
            <>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View style={{ height: 12 }} />
                <TextButton
                  text="Tải thêm bình luận trước đó"
                  onPress={fetchMoreData}
                />
                {loading ? <ActivityIndicator /> : null}
              </View>
              <CommentItem comment={item} />
            </>
          ) : (
            <CommentItem comment={item} />
          )
        }
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <CreateComment postId={post?.id} addComment={addComment} />
        }
        ListEmptyComponent={<EmptyComponent text="Chưa có bình luận nào" />}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        stickyHeaderIndices={[0]}
      />
    </BottomSheet>
  );
});

export default CommentBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
});
