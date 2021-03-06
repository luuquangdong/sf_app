import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constant/colors";
import { formatFromNow } from "../../utils/dateUtils";

const MessageItem = ({ message }) => {
  const { content, isLast, isFirst, createdTime } = message;
  return (
    <View style={styles.message}>
      <Text>{content}</Text>
      {isFirst && <Text style={styles.time}>{formatFromNow(createdTime)}</Text>}
    </View>
  );
};

const MyMessageItem = ({ message }) => {
  const { content, isLast, isFirst, createdTime } = message;
  return (
    <View style={styles.myMessage}>
      <Text>{content}</Text>
      {isFirst && <Text style={styles.time}>{formatFromNow(createdTime)}</Text>}
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
