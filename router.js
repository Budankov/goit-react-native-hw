import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";
import BtnLogOut from "./components/BtnLogOut/BtnLogOut";

// icons import
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
        tabBarItemStyle: {
          borderRadius: 20,
          marginTop: 4,
          marginBottom: 4,
          maxWidth: 70,
          margin: 8,
        },
        tabBarStyle: {
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="ios-grid-outline" size={size} color={color} />
            );
          },
          headerRight: () => <BtnLogOut />,
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="plus" size={24} color={color} />;
          },
          headerRight: () => <BtnLogOut />,
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user" size={24} color={color} />;
          },
          headerRight: () => <BtnLogOut />,
        }}
      />
    </MainTab.Navigator>
  );
};
export default useRoute;
