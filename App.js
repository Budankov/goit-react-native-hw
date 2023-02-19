import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { useFont } from "./hooks/useFont";
import useRoute from "./router";
import { store } from "./redux/store";

export default function App() {
  const { appIsReady, onLayoutRootView } = useFont();
  const routing = useRoute(false);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>
        {routing}
      </NavigationContainer>
    </Provider>
  );
}
