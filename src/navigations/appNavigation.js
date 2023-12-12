import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';

const Stack = createNativeStackNavigator();
function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={'Profile'}
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name={'EditProfile'} component={EditProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
