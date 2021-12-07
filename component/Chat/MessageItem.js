import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constant/colors";

const MessageItem = ({ message }) => {
  const { content, isLast, createdTime } = message;
  return (
    <View style={styles.message}>
      <Text>{content}</Text>
      {isLast && <Text style={styles.time}>{createdTime}</Text>}
    </View>
  );
};

const MyMessageItem = ({ message }) => {
  const { content, isLast, createdTime } = message;
  return (
    <View style={styles.myMessage}>
      <Text>{content}</Text>
      {isLast && <Text style={styles.time}>{createdTime}</Text>}
    </View>
  );
};

export { MessageItem, MyMessageItem };

const SHARE = {
  padding: 8,
  borderRadius: 8,
  flexShrink: 1,
  marginHorizontal: 4,
};

const styles = StyleSheet.create({
  message: {
    ...SHARE,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
  },
  myMessage: {
    ...SHARE,
    backgroundColor: COLORS.tripe,
    alignSelf: "flex-end",
  },
  time: {
    fontSize: 10,
    color: "#666",
  },
});
