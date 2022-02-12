import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const popUpHeight = Math.floor(SCREEN_HEIGHT * 0.5);

const Select = ({ items: its, onItemChange, selectedValue, label }) => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  useEffect(() => {
    setItems([{ id: "", label: label }, ...its]);
  }, [its]);

  const handleItemPress = (item) => {
    console.log(item);
    if (!item.id) onItemChange(null);
    else onItemChange(item);

    closeModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <View style={styles.header}>
          <Text>{selectedValue?.label || label}</Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="chevron-down" size={16} color="#777" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <View style={styles.inner}>
            <ScrollView>
              {items.map((item) => (
                <SelectItem
                  key={item.id}
                  item={item}
                  itemPress={handleItemPress}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Select;

const SelectItem = ({ item, itemPress }) => (
  <TouchableOpacity activeOpacity={0.6} onPress={itemPress.bind(null, item)}>
    <View style={styles.selectItem}>
      <Text style={styles.selectLabel}>{item.label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0003",
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    width: "100%",
    maxHeight: popUpHeight,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: "#DDD",
    flexDirection: "row",
  },
  selectItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#DDD",
    paddingHorizontal: 12,
  },
  selectLabel: {},
});
