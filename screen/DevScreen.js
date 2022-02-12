import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const windowHeight = Dimensions.get("window").height - 10;
const screenHeight = Dimensions.get("screen").height;

const DATA = [
  {
    id: "1",
    label: "Mot",
  },
  {
    id: "2",
    label: "Hai",
  },
  {
    id: "3",
    label: "Ba",
  },
  {
    id: "4",
    label: "Bon",
  },
  {
    id: "5",
    label: "Nam",
  },
  {
    id: "6",
    label: "Sau",
  },
  {
    id: "11",
    label: "Mot",
  },
  {
    id: "12x",
    label: "Hai",
  },
  {
    id: "13",
    label: "Ba",
  },
  {
    id: "14",
    label: "Bon",
  },
  {
    id: "15",
    label: "Nam",
  },
  {
    id: "16",
    label: "Sau",
  },
  {
    id: "12",
    label: "Mot",
  },
  {
    id: "22",
    label: "Hai",
  },
  {
    id: "32",
    label: "Ba",
  },
  {
    id: "42",
    label: "Bon",
  },
  {
    id: "52",
    label: "Nam",
  },
  {
    id: "62",
    label: "Sau",
  },
  {
    id: "13x",
    label: "Mot",
  },
  {
    id: "23",
    label: "Hai",
  },
  {
    id: "33",
    label: "Ba",
  },
  {
    id: "43",
    label: "Bon",
  },
  {
    id: "53",
    label: "Nam",
  },
  {
    id: "63",
    label: "Sau",
  },
  {
    id: "14x",
    label: "Mot",
  },
  {
    id: "24",
    label: "Hai",
  },
  {
    id: "34",
    label: "Ba",
  },
  {
    id: "44",
    label: "Bon",
  },
  {
    id: "54",
    label: "Nam",
  },
  {
    id: "64",
    label: "Sau",
  },
];

function DevScreen() {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "transparent",
        height: windowHeight - 10,
      }}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)"]}
        style={{ height: windowHeight / 2, margin: 0 }}
      />
      <View
        style={{
          backgroundColor: "white",
          height: windowHeight / 2,
        }}
      >
        <Text style={{ color: "black" }}>Swipe down to close</Text>
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
    </>
  );
}

export default DevScreen;

const styles = StyleSheet.create({});
