import React, { useCallback, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommentBottomSheet from "../component/Comment/CommentBottomSheet";

const ForgetPasswordScreen = () => {
  const sheetRef = useRef(null);

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
    console.log("clicked");
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={openSheet}>
        <Text>open sheet</Text>
      </TouchableOpacity>
      <Text>That su ik</Text>
      <CommentBottomSheet ref={sheetRef} />
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({});
