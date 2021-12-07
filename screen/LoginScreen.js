import React, { useState } from "react";
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
import MainButton from "../component/MainButton";
import { COLORS } from "../constant/colors";
import { textInput } from "../constant/formStyle";

export default function LoginScreen({ navigation }) {
  const [phoneNumber, onChangePhoneNumber] = useState("");
  const [password, onChangePassword] = useState("");

  const handleForgetPasswordPress = () => {
    navigation.push("ForgetPassword");
  };

  const handleSignUpPress = () => {
    navigation.push("SignUp");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={{ flex: 2 }} />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="Số điện thoại"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Mật khẩu"
            secureTextEntry={true}
          />
          <MainButton
            text="Đăng nhập"
            onPress={() =>
              navigation.replace("MainTab", {
                username: "luuquangdong",
                password: "password",
              })
            }
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleForgetPasswordPress}
          >
            <Text style={styles.forgetPasswordTxt}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={handleSignUpPress}>
            <Text style={styles.signUpTxt}>Chưa có tài khoản, đăng ký</Text>
          </TouchableOpacity>
          <View style={{ flex: 2 }} />
        </View>
      </TouchableWithoutFeedback>
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
    marginBottom: 8,
  },
  forgetPasswordTxt: {
    textAlign: "right",
    marginTop: 8,
    color: "#333",
  },
  signUpTxt: {
    marginTop: 8,
    color: COLORS.primary,
  },
});
