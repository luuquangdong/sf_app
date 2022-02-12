import moment from "moment";

const caculateAge = (dateTime) => {
  if (!dateTime) return;
  return moment().diff(dateTime, "years");
};

const idToGender = (gender) => {
  switch (gender) {
    case "MALE":
      return "Nam";
    case "FEMALE":
      return "Nữ";
    case "OTHER":
      return "Khác";
    default:
      return "";
  }
};

const genderToObject = (gender) => {
  switch (gender) {
    case "MALE":
      return { id: "MALE", label: "Nam" };
    case "FEMALE":
      return { id: "FEMALE", label: "Nữ" };
    case "OTHER":
      return { id: "OTHER", label: "Khác" };
    default:
      return null;
  }
};

const sportIdToObject = (id, sports) => {
  if (!id) return null;
  const sport = sports.find((s) => s.id === id);
  return sport;
};

const sportsToObject = (sportIds, sportList) => {
  const rs = [];
  for (id of sportIds) {
    const sport = sportList.find((s) => s.id === id);
    if (sport) rs.append(sport);
  }
  return rs;
};

export {
  caculateAge,
  genderToObject,
  sportsToObject,
  idToGender,
  sportIdToObject,
};
