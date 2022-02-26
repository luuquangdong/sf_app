import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import useSportList from "../../utils/useSportList";
import Button from "../Button";
import Select from "../Select";

const EMPTY_CHOOSE = "Chọn môn thể thao";

const SearchForm = ({ closeSearch }) => {
  const [sportName, setSportName] = useState("");
  const [sport, setSport] = useState(null);
  const [name, setName] = useState("");
  const sportList = useSportList();

  const handleSearch = () => {
    const data = { sportName, name };
    console.log(data);
  };

  return (
    <View>
      <View style={styles.input}>
        <TextInput
          placeholder="Tìm theo tên giải đấu"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
        <Select
          items={sportList}
          selectedValue={sport}
          onItemChange={setSport}
          label="Chọn môn thể thao..."
        />
      </View>
      <View style={styles.actions}>
        <Button title="Hủy" onPress={closeSearch} />
        <Button title="Tìm kiếm" onPress={handleSearch} />
      </View>
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  container: {},
  input: { backgroundColor: "#FFF" },
  textInput: {
    padding: 12,
  },
  actions: {
    flexDirection: "row",
  },
});
