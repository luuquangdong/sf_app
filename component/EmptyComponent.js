import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EmptyComponent = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  text: {
    textAlign: "center",
    color: "#0D1F2D",
  },
});
