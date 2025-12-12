import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigationTab from './src/components/BottomNavigationTab';
import BiomatricScreen from './src/screens/BiomatricScreen';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { LocationProvider } from './src/context/LocationContext';
import { AuthProvider } from './src/context/AuthContext';

import Login from './src/auth/Login';
import Register from './src/auth/Register';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <LocationProvider>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Biometric" component={BiomatricScreen} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="MainApp" component={BottomNavigationTab} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </LocationProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
};

export default App;
