import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFont } from "./hooks/useFont";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/main/Home";
import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

export default function App() {
  const { appIsReady, onLayoutRootView } = useFont();
  const AuthStack = createStackNavigator();
  const MainTab = createBottomTabNavigator();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <MainTab.Navigator>
        <MainTab.Screen name="PostsScreen" component={PostsScreen} />
        <MainTab.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
        />
        <MainTab.Screen name="ProfileScreen" component={ProfileScreen} />
      </MainTab.Navigator>
    </NavigationContainer>
  );
}

{
  /* <AuthStack.Navigator>
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
</AuthStack.Navigator>; */
}
