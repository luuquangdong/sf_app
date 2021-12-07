import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Avatar from "../component/Avatar";
import { useKeyboardHeight } from "../hooks/useKeyboardHeight";

const CreatePostScreen = () => {
  const keyboardHeight = useKeyboardHeight();

  return (
    <View style={[styles.container, { marginBottom: keyboardHeight }]}>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Bạn đang nghĩ gì?"
          multiline
          style={styles.textIpt}
        />
      </View>
      <View style={styles.action}>
        <Button title="Up Image" style={{ flex: 1 }} />
        <Button title="Up Video" style={{ flex: 1 }} />
        <Avatar url="https://picsum.photos/200" size={36} />
        <Avatar size={36} url={null} />
      </View>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  inputSection: {
    flex: 1,
  },
  textIpt: {
    fontSize: 18,
    color: "#26547C",
    flex: 1,
  },
  action: {
    flexDirection: "row",
  },
});
