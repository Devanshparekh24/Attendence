import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigationTab from './src/components/BottomNavigationTab';
import BiomatricScreen from './src/screens/BiomatricScreen';
import { LocationProvider } from './src/context/LocationContext';
import Login from './src/auth/Login';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <LocationProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Biometric" component={BiomatricScreen} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="MainApp" component={BottomNavigationTab} />
                    </Stack.Navigator>
                </NavigationContainer>
            </LocationProvider>
        </SafeAreaProvider>
    );
};

export default App;
