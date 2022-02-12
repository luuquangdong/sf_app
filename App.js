import React from "react";
import RootStackNavigation from "./navigation/RootStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import "react-native-gesture-handler";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
