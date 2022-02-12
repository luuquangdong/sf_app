import axiosInstance from "./axiosInstance";

const requestFriend = async (data) => {
  try {
    console.log("requestFriend");
    const response = await axiosInstance.post("/friends/request", data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const deleteFriend = async (friendId) => {
  try {
    console.log("deleteFriend");
    const response = await axiosInstance.delete(`/friends/${friendId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getFriends = async (userId) => {
  try {
    console.log("getFriends");
    const response = await axiosInstance.get(`/friends/${userId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getListRequestFriend = async () => {
  try {
    console.log("getListRequestFriend");
    const response = await axiosInstance.get("/friends/request");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const answerRequest = async (userId, answer) => {
  try {
    console.log("anserRequest");
    const response = await axiosInstance.get(
      `/friends/answer-request/${userId}/${answer}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export {
  requestFriend,
  deleteFriend,
  getListRequestFriend,
  answerRequest,
  getFriends,
};
