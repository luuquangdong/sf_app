import React from "react";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { updateTournamentInfo, uploadBanner } from "../../apis/tournamentApi";

import EditTournamentComponent from "../../component/Tournament/EditTournamentComponent";
import { tournamentState } from "../../recoil/atoms/tournamentState";

const EditTournamentScreen = () => {
  const [tournament, setTournament] = useRecoilState(tournamentState);
  const handleUpdateTournament = async (info, banner, formProps) => {
    info.id = tournament.id;
    if (banner) {
      const banner = await uploadBanner(banner, tournament.id);
    }
    const t = await updateTournamentInfo(info, tournament.id);
    console.log(t);
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
