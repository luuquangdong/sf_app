import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import AwesomeAlert from "react-native-awesome-alerts";

import { textInput } from "../../constant/formStyle";
import MainButton from "../../component/MainButton";
import { COLORS } from "../../constant/colors";
import { changePassword } from "../../apis/userApi";

const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Bạn chưa nhập mật khẩu cũ"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Bạn chưa nhập mật khẩu mới"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu mới không khớp")
    .required("Bạn chưa xác nhận mật khẩu mới"),
});

const ChangePasswordScreen = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleChangePasswordPressed = async (values, formProps) => {
    console.log(values);
    try {
      await changePassword({
        oldPassword: values.oldPassword,
        password: values.password,
      });
      setShowAlert(true);
    } catch (err) {
      if (err.response?.data?.code === 1105) {
        formProps.setErrors({ oldPassword: "Mật khẩu cũ không khớp" });
      } else {
        Alert.alert("Có lỗi xảy ra, đổi mật khẩu thất bại");
      }
      console.log({ err });
      // console.log(err.message);
      // console.log(err.response);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleChangePasswordPressed}
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
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Mật khẩu cũ</Text>
              <TextInput
                style={styles.input}
                value={values.oldPassword}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                secureTextEntry={true}
              />
              {errors.oldPassword && touched.oldPassword && (
                <Text style={styles.error}>{errors.oldPassword}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Mật khẩu mới</Text>
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={true}
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
              <TextInput
                style={styles.input}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={true}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>
            <View style={{ margin: 6 }} />
            <MainButton text="Xác nhận" onPress={handleSubmit} />
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Thành công"
              message="Đổi mật khẩu thành công"
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
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 12,
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
});
