import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import HeaderCreatePost from "../component/HeaderCreatePost";
import Menu from "../component/Menu";
import PostItem from "../component/PostItem";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "4 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "5 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "6 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d77",
    title: "7 Item",
  },
];

const Separator = () => <View style={styles.separator}></View>;

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        ListHeaderComponent={<HeaderCreatePost navigation={navigation} />}
        ItemSeparatorComponent={Separator}
        renderItem={({ item, index }) => (
          <PostItem post={item} setModalVisible={setModalVisible} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Menu modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});
