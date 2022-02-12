import axiosInstance from "./axiosInstance";

const login = async (phoneNumber, password) => {
  try {
    console.log("logIn");
    const response = await axiosInstance.post("/auth/login", {
      phoneNumber,
      password,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

const signUp = async (info) => {
  try {
    console.log("signUp");
    const response = await axiosInstance.post("/auth/sign-up", info);

    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw err.response?.data;
    }
    throw err;
  }
};

export { login, signUp };
