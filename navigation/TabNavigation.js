import * as React from "react";
import { Button, TouchableOpacity, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constant/colors";
import HomeScreen from "../screen/HomeScreen";
import FindFriendScreen from "../screen/Friend/FindFriendScreen";
import { ICON_SIZE } from "../constant/headerBar";
import IndividualScreen from "../screen/Individual/IndividualScreen";
import ChatScreen from "../screen/Chat/ChatScreen";
import TournamentsScreen from "../screen/Tournament/TournamentsScreen";

// function TournamentsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Tournaments</Text>
//     </View>
//   );
// }

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button title="Log Out" onPress={() => navigation.replace("Login")} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Message") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "FindFriend") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Tournaments") {
            iconName = focused ? "medal" : "medal-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "B??i vi???t" }}
      />
      <Tab.Screen
        name="Message"
        component={ChatScreen}
        // options={{ title: "Tin nh???n" }}
        options={({ navigation }) => ({
          title: "Tin nh???n",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.push("PickFriendForChat")}
              style={{ paddingRight: 12 }}
              activeOpacity={0.66}
            >
              {/* <MaterialIcons name="trophy" size={ICON_SIZE} color="#FFF" /> */}
              <MaterialIcons name="add-circle" size={ICON_SIZE} color="#FFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="FindFriend"
        component={FindFriendScreen}
        options={{ title: "T??m b???n" }}
      />
      <Tab.Screen
        name="Tournaments"
        component={TournamentsScreen}
        // options={({ navigation }) => ({
        //   title: "Gi???i ?????u",
        //   headerRight: () => (
        //     <Pressable
        //       onPress={() => navigation.push("MyTournamentTopTab")}
        //       style={{ paddingRight: 12 }}
        //     >
        //       <FontAwesome name="trophy" size={ICON_SIZE} color="#FFF" />
        //     </Pressable>
        //   ),
        // })}
        options={{ title: "Gi???i ?????u" }}
      />
      <Tab.Screen
        name="Settings"
        component={IndividualScreen}
        options={{ title: "C??i ?????t" }}
      />
    </Tab.Navigator>
  );
}
