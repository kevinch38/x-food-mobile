
import { Provider } from "react-redux";
import Navigation from "./src/router/Navigation";
import setupStore from "./store";
import ServiceProvider from './src/context/ServiceContext';
import ServiceFactory from './src/services/ServiceFactory';

const store = setupStore();
const service = ServiceFactory();
export default function App() {
  return (
      <Provider store={store}>
          <ServiceProvider service={service}>
              <Navigation />
          </ServiceProvider>
      </Provider>
  );
}
