import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constant/colors";
import Avatar from "./Avatar";

const TileConfirm = ({ user, onAcceptPressed, onCancelPressed }) => {
  const navigation = useNavigation();

  const handleInfoPressed = () => {
    navigation.navigate("UserInfo", { userId: user.phoneNumber });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.6}
        onPress={handleInfoPressed}
      >
        <Avatar name={user.name} url={user.avatar?.url} size={48} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flexShrink: 1 }}
          activeOpacity={0.6}
          onPress={handleInfoPressed}
        >
          <Text numberOfLines={1}>{user.name}</Text>
        </TouchableOpacity>
        <View style={styles.actions}>
          <MainButton onPress={onAcceptPressed} data={user.phoneNumber} />
          <View style={{ width: 8 }} />
          <SecondButton onPress={onCancelPressed} data={user.phoneNumber} />
          <View style={{ width: 8 }} />
        </View>
      </View>
    </View>
  );
};

const MainButton = ({ onPress, data }) => {
  const handlePressed = () => {
    if (onPress) onPress(data);
  };
  return (
    <TouchableOpacity style={styles.mainBtn} onPress={handlePressed}>
      <Text style={styles.buttonTxt}>Đồng ý</Text>
    </TouchableOpacity>
  );
};

const SecondButton = ({ onPress, data }) => {
  const handlePressed = () => {
    if (onPress) onPress(data);
  };
  return (
    <TouchableOpacity style={styles.secondBtn} onPress={handlePressed}>
      <Text style={styles.buttonTxt}>Hủy</Text>
    </TouchableOpacity>
  );
};

export default TileConfirm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingVertical: 8,
  },
  avatar: {
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    marginTop: 2,
  },
  mainBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
  },
  secondBtn: {
    backgroundColor: "#5c6f68",
    paddingVertical: 6,
    borderRadius: 6,
    flex: 0.8,
  },
  buttonTxt: {
    color: "#FFF",
    fontSize: 12,
    textAlign: "center",
  },
});
