import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    flex: 1,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    color: "#555",
  },
});
