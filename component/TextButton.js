import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const TextButton = ({ text, onPress }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  text: {
    color: "#009DAE",
  },
});
