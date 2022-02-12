import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constant/colors";
import Avatar from "../Avatar";

const FriendItem = ({ friend }) => {
  const navigation = useNavigation();

  const handleInfoPressed = () => {
    navigation.navigate("UserInfo", { userId: friend.phoneNumber });
  };

  const messagePressed = () => {
    navigation.navigate("DetailChat", {
      title: friend.name ?? "X",
      guest: { ...friend, id: friend.phoneNumber },
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.info}
        activeOpacity={0.6}
        onPress={handleInfoPressed}
      >
        <View style={styles.avatarWrap}>
          <Avatar name={friend.name} url={friend.avatar?.url} size={40} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {friend.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.action}>
        <Button onPress={messagePressed} />
      </View>
    </View>
  );
};

const Button = ({ onPress }) => {
  const handlePressed = () => {
    if (onPress) onPress();
  };
  return (
    <TouchableOpacity
      style={styles.buttonWrap}
      onPress={handlePressed}
      activeOpacity={0.6}
    >
      <Text style={styles.buttonTxt}>Nhắn tin</Text>
    </TouchableOpacity>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 8,
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarWrap: {
    marginHorizontal: 8,
  },
  name: {
    fontSize: 16,
  },
  action: {
    marginHorizontal: 10,
  },
  buttonWrap: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  buttonTxt: {
    color: "#FFF",
    fontSize: 14,
  },
});
