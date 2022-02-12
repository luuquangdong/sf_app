import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const getToken = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem("token");
    if (!token) return null;

    const payload = jwt_decode(token);
    if (payload.exp < Date.now() / 1000) token = null;
  } catch (e) {
    console.log(e);
  }

  return token;
};

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.log(e);
  }
};

const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log(e);
  }
};

const saveLogInfo = async (token, user, phoneNumber) => {
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("user", JSON.stringify(user));
  await AsyncStorage.setItem("phoneNumber", phoneNumber);
};

const getAuthInfo = async () => {
  const token = await getToken();

  if (!token) return {};

  const userString = await AsyncStorage.getItem("user");
  const user = JSON.parse(userString);
  return { token, user };
};

const deleteAuthInfo = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};

const getPhoneNumber = async () => {
  const phoneNumber = (await AsyncStorage.getItem("phoneNumber")) ?? "";
  return phoneNumber;
};

export {
  getToken,
  saveToken,
  deleteToken,
  getAuthInfo,
  getPhoneNumber,
  deleteAuthInfo,
  saveLogInfo,
};
