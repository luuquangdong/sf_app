import React from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { useKeyboardHeight } from "../../hooks/useKeyboardHeight";

const ChatAction = () => {
  const paddingInput = useKeyboardHeight();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        onSubmitEditing={Keyboard.dismiss}
      />
      <Button title="Send" style={styles.button} />
    </View>
  );
};

export default ChatAction;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  input: {
    flex: 4,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingVertical: 6,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
});
