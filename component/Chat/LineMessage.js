import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import { MessageItem, MyMessageItem } from "./MessageItem";
import Avatar from "../Avatar";

const LineMessage = ({ message, guest }) => {
  const { phoneNumber: meId } = useRecoilValue(userState);

  const { senderId, isFirst, isLast } = message;

  return (
    <View style={[styles.container, { marginTop: isLast ? 16 : 4 }]}>
      <View style={styles.avatarSection}>
        {isLast && senderId !== meId && (
          <Avatar size={30} url={guest?.avatar?.url} name={guest?.name} />
        )}
      </View>
      {senderId === meId && (
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
      {senderId !== meId && (
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
