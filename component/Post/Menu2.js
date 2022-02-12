import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deletePost } from "../../apis/postApi";
import { BottomSheet } from "../BottomSheet";

const MenuItem = ({ title, onPress }) => {
  const handlePressed = () => {
    if (onPress) onPress();
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

const Menu2 = ({ isShow, hide, post, showReport, removePost }) => {
  const handleShowReport = () => {
    hide();
    showReport();
  };

  const handleDeletePostPressed = async () => {
    Alert.alert("Xác nhận", "Bạn có muốn xóa bài viết này không", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Xóa", onPress: handleDeletePost },
    ]);
  };

  const handleDeletePost = async () => {
    try {
      hide();
      await deletePost(post.id);
      removePost(post.id);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <BottomSheet onOuterClick={hide} show={isShow}>
      {post?.canEdit ? (
        <>
          <MenuItem title="Xóa bài viết" onPress={handleDeletePostPressed} />
          <MenuItem title="Hủy" onPress={hide} />
        </>
      ) : (
        <>
          <MenuItem title="Báo cáo" onPress={handleShowReport} />
          <MenuItem title="Hủy" onPress={hide} />
        </>
      )}
    </BottomSheet>
  );
};

export default Menu2;

const styles = StyleSheet.create({});
