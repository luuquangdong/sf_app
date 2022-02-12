import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as yup from "yup";
import MainButton from "../component/MainButton";
import { COLORS } from "../constant/colors";
import { textInput } from "../constant/formStyle";
import { userState } from "../recoil/atoms/userState";
import { login } from "../apis/authApi";
import { Formik } from "formik";
import { saveLogInfo } from "../utils/authUtil";
import { initPhoneNumberState } from "../recoil/atoms/initPhoneNumberState";

const loginValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ")
    .required("Bạn chưa nhập số điện thoại"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Bạn chưa nhập mật khẩu"),
});

export default function LoginScreen({ navigation }) {
  const setUserState = useSetRecoilState(userState);
  const [initPhoneNumber, setInitPhoneNumber] =
    useRecoilState(initPhoneNumberState);

  const [loading, setLoading] = useState(false);
  const formikRef = useRef(null);

  useEffect(() => {
    formikRef.current.setValues({ phoneNumber: initPhoneNumber, password: "" });
  }, [initPhoneNumber]);

  const handleForgetPasswordPress = () => {
    navigation.push("ForgetPassword");
  };

  const handleSignUpPress = async () => {
    navigation.navigate("SignUp");
  };

  const handleLoginPress = async (values, others) => {
    const { phoneNumber, password } = values;
    try {
      setLoading(true);
      const { user, token } = await login(phoneNumber, password);
      console.log({ user, token });

      await saveLogInfo(token, user, phoneNumber);

      setLoading(false);

      setUserState(user);
      setInitPhoneNumber(phoneNumber);

      if (user.updatedInfo) {
        navigation.replace("MainScreen");
      } else {
        navigation.replace("UpdateInfo");
      }
    } catch (err) {
      setLoading(false);
      others.setErrors({ password: "Sai số điện thoại hoặc mật khẩu" });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        onSubmit={handleLoginPress}
        validationSchema={loginValidationSchema}
        innerRef={(p) => (formikRef.current = p)}
      >
        {({
          values,
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={{ flex: 2 }} />
              <View style={styles.formGroup}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("phoneNumber")}
                  value={values.phoneNumber}
                  placeholder="Số điện thoại"
                  keyboardType="numeric"
                  onBlur={handleBlur("phoneNumber")}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}
              </View>
              <View style={styles.formGroup}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  placeholder="Mật khẩu"
                  secureTextEntry={true}
                  onBlur={handleBlur("password")}
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <MainButton
                text="Đăng nhập"
                onPress={handleSubmit}
                disabled={loading}
              />
              <View style={{ height: 16 }} />
              <View style={styles.actionWraper}>
                <View style={styles.space} />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleForgetPasswordPress}
                >
                  <Text style={styles.forgetPasswordTxt}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 16 }} />
              <View style={styles.actionWraper}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleSignUpPress}
                >
                  <Text style={styles.signUpTxt}>
                    Chưa có tài khoản, đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2 }} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  inner: {
    width: "100%",
    flex: 1,
  },
  input: {
    ...textInput,
  },
  forgetPasswordTxt: {
    color: "#333",
  },

  signUpTxt: {
    color: COLORS.primary,
  },
  actionWraper: {
    marginTop: 8,
    flexDirection: "row",
  },
  space: {
    flex: 1,
  },
  formGroup: {
    marginVertical: 4,
  },
  error: {
    color: "red",
  },
});
