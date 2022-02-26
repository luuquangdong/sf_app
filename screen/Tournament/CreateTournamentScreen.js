import React from "react";
import { StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";

import { createTournament, uploadBanner } from "../../apis/tournamentApi";
import EditTournamentComponent from "../../component/Tournament/EditTournamentComponent";
import { userState } from "../../recoil/atoms/userState";

const CreateTournamentScreen = () => {
  const me = useRecoilValue(userState);

  const handleCreateTournament = async (info, banner) => {
    console.log(info, banner);
    if (!info) return;

    let tournament = await createTournament({
      ...info,
      organizationId: me.phoneNumber,
    });

    if (!banner) return;
    await uploadBanner(banner, tournament.id);
  };
  return (
    <EditTournamentComponent
      onOkPress={handleCreateTournament}
      successMessage="Tạo giải đấu thành công"
    />
  );
};

export default CreateTournamentScreen;

const styles = StyleSheet.create({});
