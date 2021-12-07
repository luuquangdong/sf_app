import React from "react";
import { StyleSheet, View } from "react-native";
import CommentItem from "./CommentItem";
import CreateComment from "./CreateComment";

export default function Comment() {
  return (
    <View>
      <CreateComment />
      <CommentItem />
      <CommentItem />
    </View>
  );
}

const styles = StyleSheet.create({});
