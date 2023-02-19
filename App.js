import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./components/Main";
import { useFont } from "./hooks/useFont";

export default function App() {
  const { appIsReady, onLayoutRootView } = useFont();

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main onLayout={onLayoutRootView} />
    </Provider>
  );
}
