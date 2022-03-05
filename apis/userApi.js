import axiosInstance from "./axiosInstance";

const findFriend = async (data) => {
  try {
    console.log("findFriend");
    const response = await axiosInstance.post("/users/find", data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getUserInfo = async (userId) => {
  try {
    console.log("getUserInfo");
    const response = await axiosInstance.get(`/users/${userId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateAvatar = async (data) => {
  console.log("uploadAvatar");
  console.log(data);
  try {
    const response = await axiosInstance.post("/users/update-avatar", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateUserInfo = async (data) => {
  console.log("updateUserInfo");
  try {
    const response = await axiosInstance.put(
      `/users/${data.phoneNumber}`,
      data
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getListUser = async (data) => {
  try {
    console.log("getListUser");
    const response = await axiosInstance.post("/users/list", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const changePassword = async (data) => {
  try {
    console.log("changePassword");
    const response = await axiosInstance.post("/users/change-password", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const signupOrg = async (formData) => {
  try {
    console.log("signupOrg");
    const response = await axiosInstance.post(
      "/users/signup-organization",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const setUserPushToken = async (pushToken) => {
  console.log(pushToken);
  try {
    console.log("setPushToken");
    const response = await axiosInstance.post(`/users/set-push-token`, {
      pushToken: pushToken,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const removeUserPushToken = async () => {
  try {
    console.log("removeUserPushToken");
    const response = await axiosInstance.delete("/users/remove-push-token");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export {
  findFriend,
  getUserInfo,
  updateAvatar,
  updateUserInfo,
  getListUser,
  changePassword,
  setUserPushToken,
  removeUserPushToken,
  signupOrg,
};
