import axiosInstance from "./axiosInstance";

const getListPost = async (size = 20, lastId) => {
  console.log("getListPost");
  let url = `/posts?size=${size}`;
  if (lastId) url = `${url}&lastId=${lastId}`;

  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getListPostOfUser = async (posterId) => {
  console.log("getListPostOfUserId");

  try {
    const response = await axiosInstance.get(`/posts/user/${posterId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const likePost = async (postId) => {
  console.log("likePost");
  let url = `/posts/like/${postId}`;

  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const createPost = async (post) => {
  console.log("createPost");
  try {
    const response = await axiosInstance.post("/posts", post, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const createTournamentPost = async (post) => {
  console.log("createPost");
  try {
    const response = await axiosInstance.post("/posts/tournament", post, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw err.response?.data;
    }
    throw err;
  }
};

const getListTournamentPost = async (tournamentId) => {
  console.log("getListTournamentPost");
  try {
    const response = await axiosInstance.get(
      `/posts/tournament/${tournamentId}`
    );
    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw err.response?.data;
    }
    throw err;
  }
};

const deletePost = async (postId) => {
  console.log("deletePost");
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw err.response?.data;
    }
    throw err;
  }
};

const reportPost = async (data) => {
  console.log(data);
  console.log("reportPost");
  try {
    const response = await axiosInstance.post("/posts/report", data);
    return response.data;
  } catch (err) {
    if (err.response?.data) {
      throw err.response?.data;
    }
    throw err;
  }
};

export {
  getListPost,
  likePost,
  createPost,
  getListPostOfUser,
  createTournamentPost,
  getListTournamentPost,
  deletePost,
  reportPost,
};
