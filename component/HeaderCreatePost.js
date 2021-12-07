import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PostHeader({ navigation }) {
  const handleCreatePostPress = () => {
    navigation.push("CreatePost");
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/200" }}
        />
        <TouchableOpacity onPress={handleCreatePostPress}>
          <Text>Hôm nay bạn thế nào</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text>Đăng ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text>Đăng video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  content: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  action: {
    flexDirection: "row",
  },
  actionBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
});
