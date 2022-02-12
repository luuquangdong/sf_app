import React from "react";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import EditTournamentComponent from "../../component/Tournament/EditTournamentComponent";
import { tournamentState } from "../../recoil/atoms/tournamentState";

const EditTournamentScreen = () => {
  const [tournament, setTournament] = useRecoilState(tournamentState);
  const handleUpdateTournament = (info, banner, formProps) => {
    console.log(info, banner, formProps);
  };
  return (
    <EditTournamentComponent
      onOkPress={handleUpdateTournament}
      successMessage="Cập nhật giải đấu thành công"
      tournament={tournament}
    />
  );
};

export default EditTournamentScreen;

const styles = StyleSheet.create({});
