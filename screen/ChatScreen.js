import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ZoomItem from "../component/ZoomItem";

const DATA = [
  {
    id: 1,
    zoomName: "Một",
    messages: [
      {
        from: "Me",
        to: "She",
        content: "good job",
        createdTime: "30/10",
        read: true,
      },
    ],
  },
  {
    id: 2,
    zoomName: "Hai",
    messages: [
      {
        from: "Me",
        to: "She",
        content: "good job",
        createdTime: "30/10",
        read: true,
      },
    ],
  },
  {
    id: 3,
    zoomName: "Ba",
    messages: [
      {
        from: "Me",
        to: "She",
        content: "good job",
        createdTime: "30/10",
        read: true,
      },
    ],
  },
  {
    id: 4,
    zoomName: "Bốn",
    messages: [
      {
        from: "Me",
        to: "She",
        content: "good job",
        createdTime: "30/10",
        read: true,
      },
    ],
  },
];

export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ZoomItem zoom={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
