import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CommentItem() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://picsum.photos/200" }}
      />
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>Họ tên</Text>
          <Text style={styles.time}>Thời gian</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.comment}>
            noi dung comment rat dai do nen can mot doan xuong dong
          </Text>
        </View>
      </View>
    </View>
  );
}

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
