import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import MainButton from "../component/MainButton";
import { textInput } from "../constant/formStyle";
import { ERRORS } from "../constant/errors";
import { signUp } from "../apis/authApi";
import { useSetRecoilState } from "recoil";
import { initPhoneNumberState } from "../recoil/atoms/initPhoneNumberState";
import AwesomeAlert from "react-native-awesome-alerts";
import { COLORS } from "../constant/colors";

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
  name: yup.string().required("Bạn chưa nhập họ tên"),
});

export default function SignUpScreen({ navigation, route }) {
  const setPhoneNumber = useSetRecoilState(initPhoneNumberState);
  const [showAlert, setShowAlert] = useState(false);

  const handleSignUpPress = async (values, formProps) => {
    try {
      await signUp(values);

      setShowAlert(true);
      // Alert.alert("Đăng ký thành công", "", [
      //   {
      //     text: "Đồng ý",
      //     onPress: () => {
      //       // route.params.onGoBack(values.phoneNumber);
      //       setPhoneNumber(values.phoneNumber);

      //       setTimeout(() => navigation.pop(), 600);
      //     },
      //   },
      // ]);
    } catch (err) {
      if (err.code && ERRORS[err.code]) {
        formProps.setErrors(ERRORS[err.code]);
      }
      console.log({ err });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          name: "",
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
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {errors.name && touched.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
            <View style={{ margin: 6 }} />
            <MainButton text="Đăng ký" onPress={handleSubmit} />
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Thành công"
              message="Đăng ký thành công"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              // showCancelButton={true}
              showConfirmButton={true}
              // cancelText="No, cancel"
              confirmText="OK"
              confirmButtonColor={COLORS.success}
              // onCancelPressed={() => {
              //   this.hideAlert();
              // }}
              onConfirmPressed={() => {
                setShowAlert(false);
              }}
              onDismiss={() => {
                setPhoneNumber(values.phoneNumber);
                setTimeout(() => navigation.pop(), 500);
              }}
            />
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
