import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TournamentInfoScreen from "../screen/DetailTournament/TournamentInfoScreen";
import ParticipantListScreen from "../screen/DetailTournament/ParticipantListScreen";
import RequestJoinTournamentScreen from "../screen/DetailTournament/RequestJoinTournamentScreen";
import { useRecoilValue } from "recoil";
import { tournamentState } from "../recoil/atoms/tournamentState";

const Tab = createMaterialTopTabNavigator();

function DetailTournamentTopTab() {
  const { canEdit, joined } = useRecoilValue(tournamentState);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TournamentInfo"
        component={TournamentInfoScreen}
        options={{ title: "Thông tin" }}
      />
      {(canEdit || joined) && (
        <Tab.Screen
          name="ParticipantList"
          component={ParticipantListScreen}
          options={{ title: "DS thành viên", lazy: true }}
        />
      )}
      {canEdit && (
        <Tab.Screen
          name="RequestJoinTournament"
          component={RequestJoinTournamentScreen}
          options={{ title: "DS xin tham gia", lazy: true }}
        />
      )}
    </Tab.Navigator>
  );
}

export default DetailTournamentTopTab;
