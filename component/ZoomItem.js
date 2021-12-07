import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ZoomMessageItem({ zoom }) {
  const navigation = useNavigation();

  const handleZoomPress = () => {
    navigation.push("DetailChat", { title: zoom.zoomName });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleZoomPress}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://picsum.photos/200" }}
      />
      <View style={styles.info}>
        <Text style={styles.zoomName}>{zoom.zoomName}</Text>
        <Text style={styles.lastMessage}>{zoom.messages[0].content}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  info: {
    marginLeft: 8,
  },
  zoomName: {
    fontWeight: "bold",
  },
  lastMessage: {},
});
