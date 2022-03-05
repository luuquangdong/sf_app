import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSetRecoilState } from "recoil";
import { getUserInfo } from "../apis/userApi";

import { initPhoneNumberState } from "../recoil/atoms/initPhoneNumberState";
import { userState } from "../recoil/atoms/userState";
import { getAuthInfo, getPhoneNumber } from "../utils/authUtil";

const LoadingScreen = ({ navigation }) => {
  const setUser = useSetRecoilState(userState);
  const setInitPhoneNumber = useSetRecoilState(initPhoneNumberState);

  const process = async () => {
    const { token, user } = await getAuthInfo();
    const phoneNumber = await getPhoneNumber();

    setInitPhoneNumber(phoneNumber);
    if (token) {
      getUserInfo(user.phoneNumber)
        .then((u) => setUser(u))
        .catch((e) => {
          console.log({ e });
          setUser(user);
        });

      if (user.updatedInfo) {
        navigation.replace("MainScreen");
      } else {
        navigation.replace("FirstUpdateInfo");
      }
      return;
    }
    navigation.replace("Login");
  };

  useEffect(() => {
    process();
  }, []);

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
