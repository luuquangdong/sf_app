import * as React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import { COLORS } from "../constant/colors";
import LoginScreen from "../screen/LoginScreen";
import SignUpScreen from "../screen/SignUpScreen";
import CreatePostScreen from "../screen/CreatePostScreen";
import ForgetPasswordScreen from "../screen/ForgetPasswordScreen";
import MyTournamentTopTab from "./MyTournamentTopTab";
import MyProfileTopTab from "./MyProfileTopTab";
import DetailTournamentTopTab from "../navigation/DetailTournamentTopTab";
import DetailChatScreen from "../screen/Chat/DetailChatScreen";
import DetailUserInfoScreen from "../screen/User/DetailUserInfoScreen";
import EditUserInfoScreen from "../screen/User/EditUserInfoScreen";
import UpdateInfoScreen from "../screen/User/UpdateInfoScreen";
import ChangePasswordScreen from "../screen/Individual/ChangePasswordScreen";
import DevScreen from "../screen/DevScreen";
import { FontAwesome } from "@expo/vector-icons";
import LoadingScreen from "../screen/LoadingScreen";
import EditTournamentInfoScreen from "../screen/DetailTournament/EditTournamentInfoScreen";
import CreateTournamentScreen from "../screen/Tournament/CreateTournamentScreen";
import CreateTournamentPostScreen from "../screen/Tournament/CreateTournamentPostScreen";
import MainScreen from "../screen/MainScreen";
import CreateResultTournamentScreen from "../screen/Tournament/CreateResultTournamentScreen";
import FirstUpdateInfoScreen from "../screen/User/FirstUpdateInfoScreen";
import SecondUpdateInfoScreen from "../screen/User/SecondUpdateInfoScreen";
import SignupOrganizationScreen from "../screen/Individual/SignupOrganizationScreen";
import PickFriendForChatScreen from "../screen/Chat/PickFriendForChatScreen";

function HomeScreen({ navigation, route }) {
  const { username, password } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>User Name: {username}</Text>
      <Text>Password: {password}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Three"
        onPress={() => navigation.navigate("Three", { title: "Ba", age: 21 })}
      />
    </View>
  );
}
function MyTournamentScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Gi???i ?????u c???a t??i</Text>
    </View>
  );
}
function DetailsTournamentScreen({ route }) {
  const { tournament } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{tournament.name}</Text>
    </View>
  );
}

function ThreeScreen({ navigation, route }) {
  const { age } = route.params;
  console.log(route);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Three Screen</Text>
      <Text>Recommend Age: {age}</Text>
      <Button title="Go to Home" onPress={() => navigation.popToTop()} />
    </View>
  );
}

// function LoginScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Login Screen</Text>
//       <Button
//         title="Login"
//         onPress={() =>
//           navigation.replace("MainTab", {
//             username: "luuquangdong",
//             password: "password",
//           })
//         }
//       />
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function RootStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleAlign: "center",
      }}
    >
      {/* <Stack.Screen
        name="DevScreen"
        component={DevScreen}
        options={({ navigation }) => ({
          title: "Dev Screen",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.push("Login")}
              style={{ paddingRight: 12 }}
            >
              <FontAwesome name="trophy" size={20} color="#FFF" />
            </Pressable>
          ),
        })}
      /> */}
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ title: " " }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "????ng nh???p" }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{ title: "T??m m???t kh???u" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "????ng k??" }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ title: "????ng b??i" }}
      />
      <Stack.Screen
        name="CreateResultTournament"
        component={CreateResultTournamentScreen}
        options={{ title: "K???t qu??? thi ?????u" }}
      />
      <Stack.Screen
        name="CreateTournamentPost"
        component={CreateTournamentPostScreen}
        options={{ title: "????ng b??i" }}
      />
      <Stack.Screen
        name="MyProfileTopTab"
        component={MyProfileTopTab}
        options={{ title: "H??? s?? c???a t??i" }}
      />
      <Stack.Screen
        name="MyTournamentTopTab"
        component={MyTournamentTopTab}
        options={{ title: "Gi???i ?????u c???a t??i" }}
      />
      <Stack.Screen
        name="PickFriendForChat"
        component={PickFriendForChatScreen}
        options={{ title: "He He" }}
      />
      <Stack.Screen
        name="DetailTournamentTopTab"
        component={DetailTournamentTopTab}
        options={{ title: "Chi ti???t gi???i ?????u" }}
      />
      <Stack.Screen
        name="Three"
        component={ThreeScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="EditTournamentInfo"
        component={EditTournamentInfoScreen}
        options={{ title: "S???a th??ng tin gi???i ?????u" }}
      />
      <Stack.Screen
        name="CreateTournament"
        component={CreateTournamentScreen}
        options={{ title: "T???o gi???i ?????u" }}
      />
      <Stack.Screen
        name="DetailChat"
        component={DetailChatScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="UserInfo"
        component={DetailUserInfoScreen}
        options={{ title: "Th??ng tin c?? nh??n" }}
      />
      <Stack.Screen
        name="EditUserInfo"
        component={EditUserInfoScreen}
        options={{ title: "C???p nh???t th??ng tin" }}
      />
      <Stack.Screen
        name="UpdateInfo"
        component={UpdateInfoScreen}
        options={{ title: "C???p nh???t th??ng tin" }}
      />
      <Stack.Screen
        name="FirstUpdateInfo"
        component={FirstUpdateInfoScreen}
        options={{ title: "C???p nh???t th??ng tin" }}
      />
      <Stack.Screen
        name="SecondUpdateInfo"
        component={SecondUpdateInfoScreen}
        options={{ title: "C???p nh???t th??ng tin" }}
      />
      <Stack.Screen
        name="SignupOranization"
        component={SignupOrganizationScreen}
        options={{ title: "????ng k?? t??? ch???c" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "?????i m???t kh???u" }}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
