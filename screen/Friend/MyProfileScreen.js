import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import Profile from "../../component/Profile";
import TextButton from "../../component/TextButton";
import { userState } from "../../recoil/atoms/userState";

const MyProfileScreen = ({ navigation }) => {
  const user = useRecoilValue(userState);
  const handleEditInfoPress = () => {
    navigation.navigate("EditUserInfo");
  };
  return (
    <ScrollView style={styles.container}>
      <Profile user={user} />
      <View style={styles.actions}>
        <TextButton onPress={handleEditInfoPress} text="Sửa thông tin" />
      </View>
    </ScrollView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF" },
  actions: {
    alignItems: "center",
  },
});
