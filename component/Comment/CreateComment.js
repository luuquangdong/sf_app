import React from "react";
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CreateComment() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://picsum.photos/200" }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          style={styles.createCommentTxt}
          multiline={true}
          placeholder="Viết bình luận"
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity>
        <Text>ĐĂNG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: "row",
    borderColor: "#ddd",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  createCommentTxt: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 8,
    paddingLeft: 16,
    paddingVertical: 8,
  },
});
