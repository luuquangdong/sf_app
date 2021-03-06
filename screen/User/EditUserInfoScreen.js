import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRecoilState } from "recoil";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import moment from "moment";
import { Formik } from "formik";
import AwesomeAlert from "react-native-awesome-alerts";
import mime from "mime";

import { userState } from "../../recoil/atoms/userState";
import { textInput } from "../../constant/formStyle";
import { COLORS } from "../../constant/colors";
import Select from "../../component/Select";
import MultipleSelectV2 from "../../component/MultipleSelectV2";
import Avatar from "../../component/Avatar";
import TextButton from "../../component/TextButton";
import MainButton from "../../component/MainButton";
import { genders, locations } from "../../constant/common";
import { formatIsoDate, genderToObject } from "../../utils/userUtil";
import { updateAvatar, updateUserInfo } from "../../apis/userApi";
import useSportList from "../../utils/useSportList";

const PADDING = 10;

// const PROVINCES = ["Hà Nội", "Hải Phòng", "Thành Phố Hồ Chí Minh"];
// const provinces = PROVINCES.map((item) => ({ id: item, label: item }));
// const DISTRICTS = ["Hai Bà Trưng", "Đống Đa", "Long Biên", "Trương Định"];
// const districts = DISTRICTS.map((item) => ({ id: item, label: item }));

const validationSchema = yup.object().shape({
  name: yup.string().required("Họ tên là bắt buộc"),
  birthday: yup
    .string()
    .matches(
      /^[0,1,2,3]?\d\/[0,1]?\d\/\d{4}$/,
      "Ngày sinh phải có định dạng: Ngày/tháng/năm"
    )
    .required("Ngày sinh là bắt buộc"),
});

const EditUserInfoScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [photo, setPhoto] = useState(null);

  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const [birthday, setBirthday] = useState(() => {
    if (!user?.birthday) return "";
    const [y, m, d] = user?.birthday.split("-");
    return `${d}/${m}/${y}`;
  });
  const [gender, setGender] = useState(genderToObject(user?.gender));
  const [sports, setSports] = useState(() =>
    user?.sports?.map((s) => ({ ...s, label: s.name }))
  );
  const [province, setProvince] = useState(() => {
    const index = locations.findIndex(
      (l) => l.label === user.location?.province
    );
    if (index === -1) return null;
    return { id: locations[index].id, label: locations[index].label };
  });
  const [district, setDistrict] = useState(() => {
    if (!user.location?.district) return null;
    let index = locations.findIndex((l) => l.label === user.location.province);
    if (index === -1) return null;
    const ds = locations[index].districts;

    return ds.find((d) => d.label === user.location.district);
  });
  const [description, setDescription] = useState(user.description);

  const sportList = useSportList();
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const cancelChangeAvatar = () => {
    setPhoto(null);
    setAvatar(user.avatar?.url);
  };

  const handleChoosePhoto = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert("Không được phép truy cập thư viện ảnh");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      presentationStyle: 0,
    });
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    setAvatar(pickerResult.uri);
    setPhoto(pickerResult);
  };

  const handleUpdatePress = async (values, formProps) => {
    console.log(values, formProps);
    const [d, m, y] = values.birthday.split("/");
    if (!moment([y, m - 1, d]).isValid()) {
      formProps.setErrors({ birthday: "Ngày sinh không hợp lệ" });
      return;
    }

    if (!gender?.id) {
      setError("Bạn chưa chọn giới tính");
      return;
    }

    if (!province?.id) {
      setError("Bạn chưa chọn thành phố");
      return;
    }

    setError("");

    setLoading(true);
    if (photo) {
      const form = new FormData();
      form.append("avatarFile", {
        name: photo.fileName ?? `${Date.now()}`,
        type: mime.getType(photo.uri),
        uri:
          Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
      });
      try {
        await updateAvatar(form);
      } catch (err) {
        console.log({ err });
        console.log(err.Error);
        setError("Cập nhật ảnh thất bại");
      }
    }

    const data = {
      phoneNumber: user.phoneNumber,
      name: values.name,
      birthday: formatIsoDate(y, m, d),
      gender: gender.id,
      sportIds: sports.map((s) => s.id),
      location: {
        province: province.label,
      },
      description: description,
    };
    if (district.id) {
      data.location.district = district.label;
    }
    // console.log(data);
    try {
      const userUpdated = await updateUserInfo(data);
      setUser(userUpdated);
      setLoading(false);
      setShowAlert(true);
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
      <Formik
        initialValues={{
          name: user.name,
          birthday: birthday,
        }}
        onSubmit={handleUpdatePress}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <View style={{ padding: 12 }}>
            <View style={styles.avatarContainer}>
              <Avatar url={avatar} name={user.name} size={128} />
              {photo === null ? (
                <TextButton text="Đổi avatar" onPress={handleChoosePhoto} />
              ) : (
                <TextButton text="Hủy" onPress={cancelChangeAvatar} />
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Họ tên</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {errors.name && touched.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Ngày sinh</Text>
              <TextInput
                style={styles.input}
                value={values.birthday}
                onChangeText={handleChange("birthday")}
                placeholder="dd/mm/yyyy"
                onBlur={handleBlur("birthday")}
              />
              {errors.birthday && touched.birthday && (
                <Text style={styles.error}>{errors.birthday}</Text>
              )}
              {/* <TouchableOpacity
            onPress={handleBirthdayPickerPress}
            style={{ marginLeft: 12, marginTop: 4 }}
          >
            <Text style={{ color: "#00A7E1" }}>{birthday}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onBirthdayChange}
            />
          )} */}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Giới tính</Text>
              <Select
                items={genders}
                selectedValue={gender}
                onItemChange={setGender}
                label="Chọn giới tính..."
              />
            </View>
            <Space />
            <Text style={styles.header}>Thông tin về thể thao</Text>
            <MultipleSelectV2
              items={sportList}
              selectedItems={sports}
              onSelectedItemsChange={setSports}
              label="Môn Thể Thao"
            />
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
              {/* {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )} */}
            </View>
            <Space />
            {error !== "" && (
              <View style={{ marginBottom: 4 }}>
                <Text style={{ color: "red", textAlign: "center" }}>
                  {error}
                </Text>
              </View>
            )}
            {loading && <ActivityIndicator />}
            <MainButton
              text="Cập nhật"
              onPress={handleSubmit}
              disabled={loading}
            />
          </View>
        )}
      </Formik>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Thành công"
        message="Cập nhật thông tin thành công"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={COLORS.success}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
        onDismiss={() => {
          setTimeout(() => navigation.pop(), 500);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditUserInfoScreen;

const Space = () => <View style={{ height: 24 }} />;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    color: "#369",
    marginTop: 12,
  },
  formGroup: {
    marginVertical: 4,
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
  activeText: {
    color: COLORS.primary,
    fontSize: 20,
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
