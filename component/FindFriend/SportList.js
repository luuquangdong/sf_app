import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SportList = ({ sports }) => (
  <View style={styles.container}>
    {sports.map((sport) => (
      <SportItem sportName={sport.name} key={sport.id} />
    ))}
  </View>
);

const SportItem = ({ sportName }) => {
  return (
    <View style={styles.itemWrap}>
      <Text style={styles.itemTxt}>{sportName}</Text>
    </View>
  );
};

export default SportList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemWrap: {
    margin: 2,
    paddingHorizontal: 4,
    borderColor: "#865435",
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: "#DDD",
  },
  itemTxt: {
    color: "#8454FF",
  },
});
