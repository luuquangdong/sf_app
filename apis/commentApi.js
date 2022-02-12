import axiosInstance from "./axiosInstance";

const getListComment = async (postId, page = 0, size = 20) => {
  if (!postId) return;
  console.log("getComment");
  let url = `/comments?page=${page}&size=${size}&postId=${postId}`;

  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const createComment = async (data) => {
  console.log("createComment");
  try {
    const response = await axiosInstance.post("/comments", data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getListComment, createComment };
