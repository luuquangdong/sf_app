import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../Button";
import Select from "../Select";

const SPORTS = [
  "Bóng đá",
  "Bóng rổ",
  "Cầu lông",
  "Bóng chuyền",
  "Chạy",
  "Bơi",
  "Đi bộ",
];
const EMPTY_CHOOSE = "Chọn môn thể thao";

const SearchForm = ({ closeSearch }) => {
  const [sportName, setSportName] = useState("");
  const [sport, setSport] = useState(null);
  const [name, setName] = useState("");
  const [sports] = useState(() =>
    SPORTS.map((item) => ({ id: item, label: item }))
  );

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
        {/* <Picker
          selectedValue={sportName}
          style={{ height: 30, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => setSportName(itemValue)}
        >
          {SPORTS.map((item, index) => (
            <Picker.Item label={item || EMPTY_CHOOSE} value={item} key={item} />
          ))}
        </Picker> */}
        <Select
          items={sports}
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
