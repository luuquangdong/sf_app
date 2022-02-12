import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { getListComment } from "../../apis/commentApi";
import CommentItem from "./CommentItem";
import CreateComment from "./CreateComment";
import TextButton from "../TextButton";

const SIZE = 20;

export default function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

  const addComment = async (newComment) => {
    setComments([...comments, newComment]);
  };

  const fetchData = async () => {
    if (endOfData) return;
    setLoading(true);
    try {
      console.log({ postId, page, SIZE });
      const data = await getListComment(postId, page, SIZE);
      setComments([...comments, ...data]);
      const isEnd = data.length < SIZE;
      setPage(isEnd ? page : page + 1);
      setEndOfData(isEnd);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <CreateComment postId={postId} addComment={addComment} />
      {comments.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}
      {loading && <ActivityIndicator />}
      {!loading && !endOfData && (
        <View style={styles.moreComment}>
          <TextButton text="Tải thêm bình luận" onPress={fetchData} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  moreComment: {
    alignItems: "center",
  },
});
