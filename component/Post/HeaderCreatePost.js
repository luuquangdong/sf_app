import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import Avatar from "../Avatar";

export default function PostHeader({ navigation }) {
  const user = useRecoilValue(userState);
  const handleCreatePostPress = () => {
    navigation.push("CreatePost");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCreatePostPress}>
        <View style={styles.content}>
          <Avatar url={user?.avatar?.url} name={user?.name} size={44} />
          <Text style={{ marginLeft: 8 }}>Hôm nay bạn thế nào?</Text>
        </View>
      </TouchableOpacity>
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
