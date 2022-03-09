import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "../Avatar";
import { COLORS } from "../../constant/colors";
import { useNavigation } from "@react-navigation/native";

const FriendItem2 = ({ friend }) => {
  const navigation = useNavigation();
  const handleItemPressed = () =>
    navigation.replace("DetailChat", {
      title: friend.name ?? "X",
      guest: { ...friend, id: friend.phoneNumber },
    });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.info}
        activeOpacity={0.6}
        onPress={handleItemPressed}
      >
        <View style={styles.avatarWrap}>
          <Avatar name={friend.name} url={friend.avatar?.url} size={40} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {friend.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendItem2;

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
