import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { COLORS } from "../constant/colors";

const iconSize = 16;
const selectedItemColor = "#899";

const MultipleSelectV2 = ({
  items,
  onSelectedItemsChange,
  selectedItems,
  label = "select",
  textInput = "Tìm kiếm...",
}) => {
  // console.log(items);
  const [isFocus, setFocus] = useState(false);
  const headerHeight = useHeaderHeight();
  const checkedItemsRef = useRef({});
  const [inputFilter, setInputFilter] = useState("");
  const [itemsFilter, setItemsFilter] = useState(items);

  useEffect(() => {
    setItemsFilter(items);
  }, [items]);

  useEffect(() => {
    for (let it of selectedItems) {
      checkedItemsRef.current[it.id] = true;
    }
  }, []);

  const handleInputFilter = (txt) => {
    const newItemFilters = items.filter((item) =>
      item.label.toLowerCase().includes(txt.toLowerCase())
    );
    setInputFilter(txt);
    setItemsFilter(newItemFilters);
  };

  const handleItemPress = (item) => {
    checkedItemsRef.current[item.id] = !checkedItemsRef.current[item.id];
    const newListSelectedItem = items.filter(
      (item) => checkedItemsRef.current[item.id]
    );
    onSelectedItemsChange(newListSelectedItem);
    // console.log(newListSelectedItem);
  };

  const removeItem = (item) => {
    const newListSelectedItem = selectedItems.filter((it) => it.id != item.id);
    checkedItemsRef.current[item.id] = false;

    onSelectedItemsChange(newListSelectedItem);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setFocus(true)}>
        <View style={styles.headerContainer}>
          <Text>{label}</Text>
          <View style={{ flex: 1 }} />
          <FontAwesome name="caret-down" size={24} color="#678" />
        </View>
      </TouchableOpacity>
      <View style={styles.previewSelectedItems}>
        {selectedItems.map((item) => (
          <ItemView item={item} removeItemPress={removeItem} key={item.id} />
        ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFocus}
        onRequestClose={() => {
          setFocus(!isFocus);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#1113" }}>
          <View style={[styles.inner, { marginTop: headerHeight }]}>
            <View style={styles.headerContainer}>
              <View style={styles.inputContainer}>
                <FontAwesome
                  name="search"
                  size={iconSize}
                  color="#666"
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder={textInput}
                  style={styles.filterInput}
                  value={inputFilter}
                  onChangeText={handleInputFilter}
                />
              </View>
            </View>
            <View style={styles.previewSelectedItems}>
              {selectedItems.map((item) => (
                <ItemView
                  item={item}
                  removeItemPress={removeItem}
                  key={item.id}
                />
              ))}
            </View>
            <View style={styles.optionsContainer}>
              <FlatList
                style={{ flex: 1, backgroundColor: "#FFF" }}
                data={itemsFilter}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={handleItemPress.bind(null, item)}>
                    <View
                      style={[
                        styles.item,
                        checkedItemsRef.current[item.id]
                          ? styles.selectedItem
                          : styles.noSelectedItem,
                      ]}
                    >
                      <Text>{item.label}</Text>
                      <View style={{ flex: 1 }} />
                      {checkedItemsRef.current[item.id] && (
                        <FontAwesome
                          name="check"
                          size={iconSize}
                          color="#888"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setFocus(false)}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>Hoàn tất</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ItemView = ({ item, removeItemPress }) => (
  <View style={styles.itemViewContainer}>
    <Text style={styles.itemViewTxt}>{item.label}</Text>
    <TouchableOpacity onPress={removeItemPress.bind(null, item)}>
      <Ionicons
        name="close-circle"
        size={iconSize + 4}
        color={selectedItemColor}
      />
    </TouchableOpacity>
  </View>
);

export default MultipleSelectV2;

const styles = StyleSheet.create({
  inner: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#FFF",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  searchIcon: {
    position: "absolute",
  },
  filterInput: {
    paddingLeft: iconSize + 8,
  },
  previewSelectedItems: {
    marginHorizontal: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 0.5,
    borderColor: "#DDD",
  },
  optionsContainer: {
    flex: 1,
    width: "100%",
  },
  item: {
    borderColor: "#999",
    borderBottomWidth: 0.5,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "#DDD",
  },
  noSelectedItem: {
    backgroundColor: "#FFF",
  },
  itemViewContainer: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: selectedItemColor,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: "center",
    margin: 2,
  },
  itemViewTxt: {
    marginRight: 4,
    color: selectedItemColor,
    fontSize: 14,
  },
});
