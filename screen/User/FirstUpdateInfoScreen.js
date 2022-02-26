import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import moment from "moment";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { formatIsoDate } from "../../utils/userUtil";
import Select from "../../component/Select";
import { textInput } from "../../constant/formStyle";
import { genders } from "../../constant/common";
import MainButton from "../../component/MainButton";

const validationSchema = yup.object().shape({
  birthday: yup
    .string()
    .matches(
      /^[0,1,2,3]?\d\/[0,1]?\d\/\d{4}$/,
      "Ngày sinh phải có định dạng: Ngày/tháng/năm"
    )
    .required("Ngày sinh là bắt buộc"),
});

const FirstUpdateInfoScreen = ({ navigation }) => {
  const [gender, setGender] = useState(null);
  const [error, setError] = useState("");

  const handleNextPressed = async (values, formProps) => {
    const [d, m, y] = values.birthday.split("/");
    if (!moment([y, m - 1, d]).isValid()) {
      formProps.setErrors({ birthday: "Ngày sinh không hợp lệ" });
      return;
    }

    if (!gender?.id) {
      setError("Bạn chưa chọn giới tính");
      return;
    }

    setError("");
    navigation.navigate("SecondUpdateInfo", {
      gender: gender.id,
      birthday: formatIsoDate(y, m, d),
    });
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#FFF" }}>
      <Formik
        initialValues={{
          birthday: "",
        }}
        onSubmit={handleNextPressed}
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
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "gray" }}
              >
                Những thông tin dưới đây là những thông tin cần thiết hỗ trợ cho
                việc sử dụng ứng dụng, mời bạn cập nhật đầy đủ
              </Text>
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
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Giới tính</Text>
              <Select
                items={genders}
                selectedValue={gender}
                onItemChange={setGender}
                label="Chọn giới tính..."
              />
              {error !== "" && (
                <View style={{ marginBottom: 4 }}>
                  <Text style={{ color: "red", textAlign: "center" }}>
                    {error}
                  </Text>
                </View>
              )}
            </View>
            <MainButton text="Tiếp theo" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default FirstUpdateInfoScreen;

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
  error: {
    color: "red",
  },
});
