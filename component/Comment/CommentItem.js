import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatCalendar } from "../../utils/dateUtils";
import Avatar from "../Avatar";

function CommentItem({ comment }) {
  const { author } = comment;
  return (
    <View style={styles.container}>
      {/* <Image style={styles.avatar} source={{ uri: author.avatar?.url }} /> */}
      <Avatar url={author.avatar?.url} name={author.name} size={36} />
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>{author.name}</Text>
          <Text style={styles.time}>{formatCalendar(comment.createdTime)}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.comment}>{comment.content}</Text>
        </View>
      </View>
    </View>
  );
}

export default React.memo(CommentItem);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    borderColor: "#ddd",
    borderBottomWidth: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  content: {
    marginLeft: 8,
    flexShrink: 1,
  },
  info: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  comment: {
    flexShrink: 1,
  },
});
