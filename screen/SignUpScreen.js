import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import MainButton from "../component/MainButton";
import { textInput } from "../constant/formStyle";

const signUpValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ")
    .required("Bạn chưa nhập số điện thoại"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Bạn chưa nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp")
    .required("Bạn chưa xác nhận mật khẩu"),
  fullName: yup.string().required("Bạn chưa nhập họ tên"),
});

export default function SignUpScreen({ navigation }) {
  const handleSignUpPress = (values) => {
    console.log(values);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          fullName: "",
        }}
        onSubmit={handleSignUpPress}
        validationSchema={signUpValidationSchema}
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
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
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
              <Text style={styles.label}>Nhập lại mật khẩu</Text>
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
            <View style={styles.formGroup}>
              <Text style={styles.label}>Họ tên</Text>
              <TextInput
                style={styles.input}
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
              />
              {errors.fullName && touched.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}
            </View>
            <View style={{ margin: 6 }} />
            <MainButton text="Đăng ký" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
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
