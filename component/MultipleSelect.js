import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const iconSize = 16;
const screenHeight = Dimensions.get("screen").height;

const MultipleSelect = ({ items, onSelectedItemsChange, selectedItems }) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <View style={styles.container}>
      {isFocus ? (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.inputContainer}>
              <FontAwesome
                name="search"
                size={iconSize}
                color="#666"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Nhập môn thể thao"
                style={styles.filterInput}
              />
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <FlatList
              style={{ flex: 1, backgroundColor: "#FFF" }}
              data={items}
              renderItem={({ item }) => (
                <View
                  style={{
                    borderColor: "#999",
                    borderBottomWidth: 0.5,
                    backgroundColor: "#FFF",
                  }}
                >
                  <TouchableOpacity>
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => setFocus(false)}>
              <View
                style={{
                  backgroundColor: "blue",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>Hoàn tất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity onPress={() => setFocus(true)}>
          <View style={styles.headerContainer}>
            <Text>Hello</Text>
            <View style={{ flex: 1 }} />
            <FontAwesome name="caret-down" size={24} color="#678" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

// const SelectHeader = () => (
// <TouchableOpacity>
// <View style={styles.headerContainer}>
//   <Text>OK</Text>
// </View>
// </TouchableOpacity>)

export default MultipleSelect;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
  },
  headerContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 6,
    flexDirection: "row",
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
  },
  filterInput: {
    paddingLeft: iconSize + 6,
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    zIndex: 1,
    maxHeight: screenHeight * 0.5,
  },
});
