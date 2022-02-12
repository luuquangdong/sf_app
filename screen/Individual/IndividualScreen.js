import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteAuthInfo } from "../../utils/authUtil";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState";

const IndividualScreen = ({ navigation }) => {
  const [me, setMe] = useRecoilState(userState);

  const handleLogout = async () => {
    await deleteAuthInfo();
    setMe(null);
    navigation.replace("Login");
  };

  const handleMyPagePressed = () =>
    navigation.navigate("UserInfo", { userId: me.phoneNumber });

  const handleChangePasswordPressed = () =>
    navigation.navigate("ChangePassword");

  return (
    <ScrollView>
      <Item
        title="Trang cá nhân"
        hasIcon={true}
        onPress={handleMyPagePressed}
      />
      <Item title="Quảng cáo" hasIcon={true} />
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
