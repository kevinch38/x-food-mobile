import { Provider } from "react-redux";
import Navigation from "./src/router/Navigation";
import setupStore from "./store";

const store = setupStore();

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  );
}
