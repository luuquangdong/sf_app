import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyFriendsScreen from "../screen/Friend/MyFriendsScreen";
import MyProfileScreen from "../screen/Friend/MyProfileScreen";
import RequestMakeFriendScreen from "../screen/Friend/RequestMakeFriendScreen";

const Tab = createMaterialTopTabNavigator();

function MyProfileTopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ title: "Hồ sơ của tôi" }}
      />
      <Tab.Screen
        name="MyFriends"
        component={MyFriendsScreen}
        options={{ title: "Danh sách bạn", lazy: true }}
      />
      <Tab.Screen
        name="RequestMakeFriend"
        component={RequestMakeFriendScreen}
        options={{ title: "Lời mời kết bạn", lazy: true }}
      />
    </Tab.Navigator>
  );
}

export default MyProfileTopTab;
