import React, { useState } from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { useKeyboardHeight } from "../../hooks/useKeyboardHeight";

const ChatAction = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const paddingInput = useKeyboardHeight();

  const handleSendPress = () => {
    if (!message) return;
    sendMessage(message);
    setMessage("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        multiline
        onSubmitEditing={Keyboard.dismiss}
      />
      <Button title="Send" style={styles.button} onPress={handleSendPress} />
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
