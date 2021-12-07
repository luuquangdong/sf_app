import * as React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import { COLORS } from "../constant/colors";
import LoginScreen from "../screen/LoginScreen";
import SignUpScreen from "../screen/SignUpScreen";
import DetailChatScreen from "../screen/DetailChatScreen";
import CreatePostScreen from "../screen/CreatePostScreen";

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

function ForgetPasswordScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Quên mật khẩu</Text>
    </View>
  );
}
function DetailMessageScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Chi tiết tin nhắn</Text>
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Đăng nhập" }}
      />
      <Stack.Screen
        name="MainTab"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{ title: "Tìm mật khẩu" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Đăng ký" }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ title: "Đăng bài" }}
      />
      <Stack.Screen
        name="Three"
        component={ThreeScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="DetailChat"
        component={DetailChatScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigation;
