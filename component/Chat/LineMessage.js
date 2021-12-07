import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MessageItem, MyMessageItem } from "./MessageItem";

const LineMessage = ({ message }) => {
  const { sender, isFirst } = message;
  return (
    <View style={[styles.container, { marginTop: isFirst ? 16 : 4 }]}>
      <View style={styles.avatarSection}>
        {isFirst && sender !== "Me" && (
          <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/200" }}
          />
        )}
      </View>
      {sender === "Me" && (
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View style={styles.space}></View>
          <MyMessageItem message={message} />
        </View>
      )}
      {sender !== "Me" && (
        <>
          <MessageItem message={message} />
          <View style={styles.space}></View>
        </>
      )}
    </View>
  );
};

export default LineMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  avatarSection: {
    width: 30,
    height: 30,
    marginLeft: 8,
    marginRight: 4,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  text: {
    flex: 1,
  },
  space: {
    width: "15%",
  },
});
