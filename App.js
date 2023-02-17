import { NavigationContainer } from "@react-navigation/native";

import { useFont } from "./hooks/useFont";
import useRoute from "./router";

export default function App() {
  const { appIsReady, onLayoutRootView } = useFont();
  const routing = useRoute(1);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}
