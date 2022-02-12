import axiosInstance from "./axiosInstance";

const getListSport = async () => {
  try {
    console.log("getListSport");
    const response = await axiosInstance.get("/sports");

    return response.data;
  } catch (err) {
    throw err;
  }
};

export { getListSport };
