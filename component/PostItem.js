import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Comment from "./Comment";

export default function PostItem({ setModalVisible }) {
  const [showComment, setShowComment] = useState(false);

  const handleCommentPress = useCallback(
    () => setShowComment((preShow) => !preShow),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://picsum.photos/200" }}
          />
          <View style={styles.title}>
            <Text style={styles.name}>Họ tên</Text>
            <Text style={styles.time}>Thời gian</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="ellipsis-horizontal" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>Nội dung</Text>
        </View>
        <View style={styles.action}>
          <TouchableOpacity style={styles.like}>
            <MaterialIcons name="thumb-up" size={20} color="#666" />
            <Text> 100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.comment} onPress={handleCommentPress}>
            <Text>200</Text>
            <Text> Bình luận</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showComment && <Comment />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
  },
  post: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  title: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    color: "blue",
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  content: {
    marginVertical: 8,
    flexShrink: 1,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
  like: {
    flexDirection: "row",
  },
  comment: {
    flexDirection: "row",
  },
});
