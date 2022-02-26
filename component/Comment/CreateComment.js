import React, { useState } from "react";
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
import { useRecoilValue } from "recoil";
import { createComment } from "../../apis/commentApi";
import { userState } from "../../recoil/atoms/userState";
import Avatar from "../Avatar";
import SendButton from "../SendButton";

export default function CreateComment({ postId, addComment }) {
  const user = useRecoilValue(userState);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendPressed = async () => {
    if (!content.trim()) return;
    try {
      setLoading(true);
      const cmt = await createComment({ postId: postId, content: content });
      if (addComment) addComment(cmt);
      setContent("");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Avatar url={user?.avatar?.url} name={user?.name} size={36} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          style={styles.createCommentTxt}
          multiline={true}
          placeholder="Viết bình luận"
          value={content}
          onChangeText={setContent}
        />
      </TouchableWithoutFeedback>
      {/* <TouchableOpacity onPress={handleSendPressed}>
        <Text>ĐĂNG</Text>
      </TouchableOpacity> */}
      <SendButton
        text="ĐĂNG"
        disabled={!content || loading}
        onPress={handleSendPressed}
      />
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
    backgroundColor: "#FFF",
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
