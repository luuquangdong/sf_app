import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import { reportPost } from "../../apis/postApi";
import { userState } from "../../recoil/atoms/userState";
import { BottomSheet } from "../BottomSheet";

const MenuItem = ({ title, onPress }) => {
  const handlePressed = () => {
    if (onPress) onPress(title);
  };
  return (
    <TouchableOpacity onPress={handlePressed}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
          borderColor: "#DDD",
          borderBottomWidth: 1,
        }}
      >
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const items = [
  { title: "Tin giả" },
  { title: "Quấy rối" },
  { title: "Nội dung nhạy cảm" },
];

const ReportPostMenu = ({ isShow, hide, post }) => {
  const me = useRecoilValue(userState);

  const handleItemPressed = async (title) => {
    hide();
    await reportPost({
      userId: me.phoneNumber,
      postId: post.id,
      reason: title,
    });
    Alert.alert("Thành công", "Đã báo cáo bài viết");
  };

  return (
    <BottomSheet onOuterClick={hide} show={isShow}>
      {items.map((it, index) => (
        <MenuItem title={it.title} key={index} onPress={handleItemPressed} />
      ))}
      {/* <MenuItem title="Khác" /> */}
      <MenuItem title="Hủy" onPress={hide} />
    </BottomSheet>
  );
};

export default ReportPostMenu;
