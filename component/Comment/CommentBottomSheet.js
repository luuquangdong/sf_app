import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRecoilValue } from "recoil";
import { currentPostState } from "../../recoil/atoms/currentPostState";
import CommentItem from "./CommentItem";
import { getListComment } from "../../apis/commentApi";
import CreateComment from "./CreateComment";
import EmptyComponent from "../EmptyComponent";

const SIZE = 30;

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

  // const fetchMoreData = async () => {
  //   if (endOfData) return;
  //   setLoading(true);
  //   try {
  //     console.log({ post: post?.id, page, SIZE });
  //     const data = await getListComment(post?.id, page, SIZE);
  //     setComments([...comments, ...data]);
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
    setPage(0);
    setEndOfData(false);
    try {
      console.log({ post: post?.id, page, SIZE });
      const data = await getListComment(post?.id, 0, SIZE);
      setComments([...data]);
      const isEnd = data.length < SIZE;
      setPage(isEnd ? page : page + 1);
      setEndOfData(isEnd);
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
        renderItem={({ item }) => <CommentItem comment={item} />}
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
