import React from "react";
import RootStackNavigation from "./navigation/RootStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import "react-native-gesture-handler";
import NotificationWrapper from "./component/NotificationWrapper";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <RecoilRoot>
      <NotificationWrapper>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </NotificationWrapper>
    </RecoilRoot>
  );
}
