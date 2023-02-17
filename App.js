import { NavigationContainer } from "@react-navigation/native";
import { useFont } from "./hooks/useFont";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

export default function App() {
  const { appIsReady, onLayoutRootView } = useFont();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </NavigationContainer>
  );
}
