import axiosInstance from "./axiosInstance";

const getListRoom = async (userId) => {
  try {
    console.log("getListRoom");
    const response = await axiosInstance.get(`/chats/rooms/${userId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const createRoom = async (userIds) => {
  if (userIds.length < 2) throw "userIds >= 2";
  try {
    console.log("createRoom");
    const response = await axiosInstance.post("/chats/rooms", {
      userIds: userIds,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getListRoom, createRoom };
