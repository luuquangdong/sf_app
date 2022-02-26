import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const MyButton = ({ onPress, text, color, backgroundColor }) => {
  const handlePressed = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePressed}
      style={[
        styles.wrapper,
        backgroundColor && { backgroundColor: backgroundColor },
      ]}
      activeOpacity={0.6}
    >
      <Text style={[styles.txt, color && { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    backgroundColor: "#2BA84A",
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  txt: {
    textAlign: "center",
    color: "#FFF",
  },
});
