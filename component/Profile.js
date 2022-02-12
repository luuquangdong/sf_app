import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { caculateAge, idToGender } from "../utils/userUtil";
import Avatar from "./Avatar";

const Profile = ({ user }) => {
  return (
    <View>
      <View style={styles.userInfo}>
        <Avatar url={user?.avatar?.url} name={user?.name} size={128} />
        <Text style={styles.nameTxt}>{user?.name}</Text>
        <Text>{`${idToGender(user?.gender)} - ${caculateAge(
          user?.birthday
        )} tuổi`}</Text>
      </View>
      <View style={styles.sportInfo}>
        <Text style={styles.header}>Thông tin về môn thể thao</Text>
        <Text>
          <Text style={styles.label}>Môn thể thao: </Text>
          {user?.sports?.map((s) => s.name).join(", ")}
        </Text>
        <Text>
          <Text style={styles.label}>Địa điểm: </Text>
          {getLocation(user?.location)}
        </Text>
        <Text>
          <Text style={styles.label}>Giới thiệu thêm: </Text>
          {user?.description}
        </Text>
      </View>
    </View>
  );
};

const getLocation = (location) => {
  if (!location) return "";
  if (!location.district) return location?.province;
  return `${location.district} - ${location?.province}`;
};

export default Profile;

const styles = StyleSheet.create({
  userInfo: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#FFEDE1",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#89316830",
  },
  nameTxt: {
    fontWeight: "bold",
  },
  sportInfo: {
    padding: 12,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    color: "#5F4BB6",
    marginBottom: 4,
  },
  label: {
    color: "#777",
    fontWeight: "600",
  },
});
