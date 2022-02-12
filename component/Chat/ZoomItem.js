import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";

export default function ZoomMessageItem({ room, meId }) {
  const navigation = useNavigation();

  const handleZoomPress = () => {
    navigation.push("DetailChat", {
      title: room.guest?.name ?? "X",
      roomId: room.id,
      guest: room.guest,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleZoomPress}>
      {/* <Image style={styles.avatar} source={{ uri: room.guest?.avatar?.url }} /> */}
      <Avatar
        name={room.guest?.name ?? "A"}
        url={room.guest?.avatar?.url}
        size={48}
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.zoomName}>
          {room.guest?.name ?? "X"}
        </Text>
        <Text numberOfLines={1} style={styles.lastMessage}>{`${
          room.messages?.[0].senderId === meId ? "Tôi: " : ""
        }${room.messages?.[0]?.content}`}</Text>
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
    fontWeight: "600",
  },
  lastMessage: {
    fontSize: 12,
    color: "#A5ABAF",
  },
});
