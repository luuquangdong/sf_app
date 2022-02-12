import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MyHeader = ({ onPress, title }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#DDD",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#5F4BB6",
  },
});
