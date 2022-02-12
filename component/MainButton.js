import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constant/colors";

export default function MainButton(props) {
  const { text, onPress, backgroundColor, color, disabled } = props;

  const handleOnPress = () => {
    if (disabled) return;
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.66}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: backgroundColor ?? COLORS.primary },
      ]}
    >
      <Text style={[styles.textBtn, { color: color ?? "#fff" }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
  },
  textBtn: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
});
