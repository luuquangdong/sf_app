import axiosInstance from "./axiosInstance";

const createTournament = async (data) => {
  try {
    console.log("createTournament");
    const response = await axiosInstance.post("/tournaments", data);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const uploadBanner = async (banner, tournamentId) => {
  try {
    console.log("uploadBanner");
    const response = await axiosInstance.put(
      `/tournaments/update-banner/${tournamentId}`,
      banner,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateTournamentInfo = async (info, tournamentId) => {
  try {
    console.log("updateTournamentInfo");
    const response = await axiosInstance.put(
      `/tournaments/update-info/${tournamentId}`,
      info
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getListTournament = async (index, size) => {
  try {
    console.log("getListTournament");
    let url = `/tournaments?size=${size}&index=${index}`;
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getTournamentsJoined = async () => {
  try {
    console.log("getTournamentsJoined");
    const response = await axiosInstance.get("/tournaments/joined");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const getMyTournaments = async () => {
  try {
    console.log("getMyTournaments");
    const response = await axiosInstance.get("/tournaments/my");

    return response.data;
  } catch (err) {
    throw err;
  }
};

const requestToJoinTournament = async (tournamentId) => {
  try {
    console.log("requestToJoinTournament");
    const response = await axiosInstance.get(
      `/tournaments/join/${tournamentId}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

const answerRequest = async (data) => {
  try {
    console.log("answerRequest");
    const response = await axiosInstance.post(
      "/tournaments/answer-request",
      data
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export {
  createTournament,
  uploadBanner,
  updateTournamentInfo,
  getListTournament,
  getTournamentsJoined,
  getMyTournaments,
  requestToJoinTournament,
  answerRequest,
};
