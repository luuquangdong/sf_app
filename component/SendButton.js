import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constant/colors";

const SendButton = ({ text, onPress, color, backgroundColor, disabled }) => {
  const handlePressed = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.66}
      onPress={handlePressed}
      disabled={disabled}
    >
      <View
        opacity={disabled ? 0.66 : 1}
        style={[
          styles.wrapper,
          backgroundColor && { backgroundColor: backgroundColor },
        ]}
      >
        <Text style={[styles.txt, color && { color: color }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SendButton;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  txt: {
    textAlign: "center",
    color: "#FFF",
  },
});
