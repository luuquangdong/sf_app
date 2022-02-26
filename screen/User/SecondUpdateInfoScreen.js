import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { locations } from "../../constant/common";
import MultipleSelectV2 from "../../component/MultipleSelectV2";
import Select from "../../component/Select";
import MainButton from "../../component/MainButton";
import { userState } from "../../recoil/atoms/userState";
import { textInput } from "../../constant/formStyle";
import useSportList from "../../utils/useSportList";
import { updateUserInfo } from "../../apis/userApi";

const SecondUpdateInfoScreen = ({ navigation, route }) => {
  const sportList = useSportList();
  const [user, setUser] = useRecoilState(userState);

  const [sports, setSports] = useState([]);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [description, setDescription] = useState(user.description);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleUpdatePressed = async () => {
    if (!province?.id) {
      setError("Bạn chưa chọn thành phố");
      return;
    }

    setError("");

    setLoading(true);

    const { gender, birthday } = route.params;

    const data = {
      phoneNumber: user.phoneNumber,
      name: user.name,
      birthday,
      gender,
      sportIds: sports.map((s) => s.id),
      location: {
        province: province.label,
      },
      description: description,
    };
    if (district?.id) {
      data.location.district = district.label;
    }
    // console.log(data);
    try {
      const userUpdated = await updateUserInfo(data);

      setUser(userUpdated);
      setLoading(false);

      navigation.reset({ index: 0, routes: [{ name: "MainScreen" }] });
    } catch (err) {
      console.log({ err });
      setLoading(false);
      setError("Cập nhật thông tin thất bại");
    }
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
    <KeyboardAwareScrollView style={{ backgroundColor: "#FFF" }}>
      <View style={{ padding: 12 }}>
        <View style={styles.placeSection}>
          <Text style={styles.label}>Môn thể thao bạn muốn chơi</Text>
          <MultipleSelectV2
            items={sportList}
            selectedItems={sports}
            onSelectedItemsChange={setSports}
            label="Môn Thể Thao"
          />
        </View>
        <View style={styles.placeSection}>
          <Text style={styles.label}>Địa Điểm:</Text>
          <View>
            <View style={styles.subSection}>
              <Text style={styles.label}>Tỉnh/Thành Phố:</Text>
              <Select
                items={provinces}
                selectedValue={province}
                onItemChange={setProvince}
                label="Chọn Tỉnh/Thành Phố..."
              />
              <Text style={styles.label}>Quận/Huyện:</Text>
              <Select
                items={districts}
                selectedValue={district}
                onItemChange={setDistrict}
                label="Chọn Quận/Huyện..."
              />
            </View>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Giới thiệu thêm</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={2}
          />
        </View>
        <Space />
        {error !== "" && (
          <View style={{ marginBottom: 4 }}>
            <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
          </View>
        )}
        {loading && <ActivityIndicator />}
        <MainButton
          text="Cập nhật"
          onPress={handleUpdatePressed}
          disabled={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SecondUpdateInfoScreen;

const styles = StyleSheet.create({
  formGroup: {
    marginVertical: 4,
  },
  label: {
    color: "#666",
  },
  input: {
    ...textInput,
  },
  placeSection: {
    marginVertical: 8,
  },
  subSection: {
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingBottom: 8,
    borderColor: "#DDD",
    borderWidth: 0.5,
  },
});

const Space = () => <View style={{ height: 24 }} />;
