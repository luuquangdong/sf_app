import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyTournamentsScreen from "../screen/Tournament/MyTournamentsScreen";
import TournamentManagerScreen from "../screen/Tournament/TournamentManagerScreen";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms/userState";
import { ROLE } from "../constant/auth";

const Tab = createMaterialTopTabNavigator();

function MyTournamentTopTab() {
  const me = useRecoilValue(userState);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MyTournaments"
        component={MyTournamentsScreen}
        options={{ title: "Đang tham gia", lazy: true }}
      />
      {me.role === ROLE.organization && (
        <Tab.Screen
          name="TournamentManager"
          component={TournamentManagerScreen}
          options={{ title: "Quản lý giải đấu", lazy: true }}
        />
      )}
    </Tab.Navigator>
  );
}

export default MyTournamentTopTab;
