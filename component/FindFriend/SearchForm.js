import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState } from "recoil";
import MultipleSelectV2 from "../MultipleSelectV2";
import Button from "../Button";
import { textInput } from "../../constant/formStyle";
import Select from "../Select";
import { getListSport } from "../../apis/sportApi";
import { sportListState } from "../../recoil/atoms/sportListState";
import useSportList from "../../utils/useSportList";
import { locations } from "../../constant/common";

const PADDING = 10;

// const provinces = [
//   { id: 1, label: "Hà Nội" },
//   { id: 2, label: "Hải Phòng" },
//   { id: 3, label: "Đà Nắng" },
//   { id: 4, label: "TP Hồ Chí Minh" },
// ];
// const districts = [
//   { id: 1, label: "Hai Bà Trưng" },
//   { id: 2, label: "Đống Đa" },
//   { id: 3, label: "Hoàng Mai" },
// ];

const genders = [
  { id: "MALE", label: "Nam" },
  { id: "FEMALE", label: "Nữ" },
  { id: "OTHER", label: "Khác" },
];

const SearchForm = ({ closeSearchMode, submit }) => {
  const [sports, setSports] = useState([]);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [age, setAge] = useState("");

  const sportList = useSportList();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleSubmit = () => {
    const data = {};
    if (name) data.name = name;
    if (sports.length > 0) data.sportIds = sports.map((s) => s.id);
    if (province?.id) {
      data.location = { province: province.label };
      if (district?.id) data.location.district = district.label;
    }
    if (gender) data.gender = gender;
    data.fromAge = fromAge;
    data.toAge = toAge;
    data.age = age;
    submit(data);
  };

  useEffect(() => {
    const data = locations.map((l) => ({
      label: l.label,
      id: l.id,
    }));
    setProvinces(data);
  }, []);

  useEffect(() => {
    if (!province) return;
    const index = locations.findIndex((l) => l.id === province.id);

    if (index !== -1) setDistricts(locations[index]?.districts);
  }, [province]);

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ tên</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.sportsSection}>
        <MultipleSelectV2
          items={sportList}
          selectedItems={sports}
          onSelectedItemsChange={setSports}
          label="Chọn Môn Thể Thao"
        />
      </View>
      <View style={styles.placeSection}>
        <Text style={styles.label}>Địa Điểm:</Text>
        <View>
          <View style={styles.subSection}>
            <Text style={styles.label}>Tỉnh/Thành Phố</Text>
            <Select
              items={provinces}
              selectedValue={province}
              onItemChange={setProvince}
              label="Bất kỳ"
            />
            <View>
              <Text style={styles.label}>Quận/Huyện:</Text>
              <Select
                items={districts}
                selectedValue={district}
                onItemChange={setDistrict}
                label="Bất kỳ"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.genderSection}>
        <Text style={styles.label}>Giới Tính:</Text>
        <Select
          items={genders}
          selectedValue={gender}
          onItemChange={setGender}
          label="Bất kỳ"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Độ tuổi</Text>
        <TextInput
          placeholder="Khoảng độ tuổi gần nhất"
          style={styles.input}
          value={fromAge}
          onChangeText={setFromAge}
          keyboardType="numeric"
        />
        {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TextInput
            placeholder="Từ"
            style={[styles.input, { width: "47%" }]}
            value={fromAge}
            onChangeText={setFromAge}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Đến"
            style={[styles.input, { width: "47%" }]}
            value={toAge}
            onChangeText={setToAge}
            keyboardType="numeric"
          />
        </View> */}
      </View>
      <View style={styles.actions}>
        <Button title="Thu nhỏ" onPress={closeSearchMode} />
        <Button title="Tìm kiếm" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    marginBottom: 8,
  },
  sportsSection: {
    backgroundColor: "#FFF",
  },
  placeSection: {
    paddingHorizontal: PADDING,
    padding: 8,
    borderRadius: 6,
  },
  genderSection: {
    paddingHorizontal: PADDING,
  },
  actions: {
    marginTop: 8,
    flexDirection: "row",
  },
  actionBtn: {
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#DDD",
    flex: 1,
  },
  subSection: {
    paddingHorizontal: 8,
    // backgroundColor: "#EEE",
    borderRadius: 8,
    paddingBottom: 8,
    borderWidth: 0.5,
    borderColor: "#DDD",
  },
  subSection2: {
    paddingHorizontal: 8,
  },
  formGroup: {
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  label: {
    color: "#666",
  },
  input: {
    ...textInput,
  },
  error: {
    color: "red",
  },
});
