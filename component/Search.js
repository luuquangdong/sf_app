import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const iconSize = 20;
const paddingHorizontal = 8;

const Search = ({ onPress }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <FontAwesome
          name="search"
          size={iconSize}
          color="#666"
          style={styles.iconSearch}
        />
        <Text style={styles.text}>Tìm kiếm</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "#DDD",
    borderBottomColor: "#DDD",
  },
  iconSearch: {
    marginHorizontal: paddingHorizontal,
    position: "absolute",
    top: 16,
  },
  text: {
    marginLeft: paddingHorizontal * 2 + iconSize,
    color: "#666",
  },
});
