import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../Avatar";
import SportList from "./SportList";
import { GENDER } from "../../constant/common";
import { caculateAge } from "../../utils/userUtil";

const UserInfoItem = ({ user }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.push("UserInfo", { userId: user.phoneNumber });
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleItemPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar size={36} url={user?.avatar?.url} name={user.name} />
          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.extraInfo}>{`${caculateAge(
              user.birthday
            )} tuổi - ${getGender(user.gender)}`}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <SportList sports={user.sports} />
          <View style={styles.place}>
            <MaterialIcons name="place" size={16} color="gray" />
            <Text style={styles.mainTxt}>{getLocation(user.location)}</Text>
          </View>
          {/* <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#678" }}>Trình độ: </Text>
            <Text style={styles.mainTxt}>{user.level}</Text>
          </View> */}
          {/* <Text style={styles.recentAchie}>Vô địch world cup</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getLocation = (location) => {
  if (!location) return "";
  if (!location.district) return location?.province;
  return `${location.district} - ${location?.province}`;
};

export default UserInfoItem;

const getGender = (gender) => {
  switch (gender) {
    case GENDER.male:
      return "Nam";
    case GENDER.female:
      return "Nữ";
    case GENDER.other:
      return "Khác";
    default:
      return "";
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#FFF",
    // marginBottom: 8,
    borderColor: "#ddd",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    justifyContent: "space-between",
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    color: "#333",
  },
  extraInfo: {
    fontSize: 12,
    color: "#999",
  },
  body: {
    marginTop: 8,
  },
  place: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  mainTxt: {
    color: "#d4b",
  },
});
