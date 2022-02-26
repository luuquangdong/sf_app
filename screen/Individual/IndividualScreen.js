import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";

import { deleteAuthInfo } from "../../utils/authUtil";
import { userState } from "../../recoil/atoms/userState";
import { removeUserPushToken } from "../../apis/userApi";
import { ROLE } from "../../constant/auth";

const IndividualScreen = ({ navigation }) => {
  const [me, setMe] = useRecoilState(userState);

  const handleLogout = async () => {
    removeInfo();
    navigation.replace("Login");
  };

  const removeInfo = async () => {
    try {
      setMe(null);
      await removeUserPushToken();
      await deleteAuthInfo();
    } catch (err) {
      console.log({ err });
      console.log(err.response);
    }
  };

  const handleMyPagePressed = () =>
    navigation.navigate("UserInfo", { userId: me.phoneNumber });

  const handleChangePasswordPressed = () =>
    navigation.navigate("ChangePassword");

  const handleSignupOgrPressed = () => navigation.navigate("SignupOranization");

  return (
    <ScrollView>
      <Item
        title="Trang cá nhân"
        hasIcon={true}
        onPress={handleMyPagePressed}
      />
      {me.role === ROLE.user && (
        <Item
          title="Đăng ký thành tổ chức"
          hasIcon={true}
          onPress={handleSignupOgrPressed}
        />
      )}
      <Item
        title="Đổi mật khẩu"
        hasIcon={true}
        onPress={handleChangePasswordPressed}
      />
      <Item title="Đăng xuất" onPress={handleLogout} />
      {/* <Item title="Danh sách bạn" hasIcon={true} /> */}
    </ScrollView>
  );
};

const Item = ({ title, onPress, hasIcon }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.itemContainer}>
        <Text style={{ flex: 1 }}>{title}</Text>
        {hasIcon && (
          <MaterialIcons name="navigate-next" size={20} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default IndividualScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
    marginBottom: 2,
  },
});
