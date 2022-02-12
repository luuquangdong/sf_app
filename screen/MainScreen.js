import React from "react";
import TabNavigation from "../navigation/TabNavigation";
import StompWrapper from "../component/StompWrapper";

const MainScreen = () => {
  return (
    <StompWrapper>
      <TabNavigation />
    </StompWrapper>
  );
};

export default MainScreen;
