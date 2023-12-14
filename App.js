import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login/index";
import Navigation from "./src/router/Navigation";
import setupStore from "./store";

const store = setupStore();

const Stack = createStackNavigator();
export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}}/>
    //     <Stack.Screen name='Login' component={Login}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
