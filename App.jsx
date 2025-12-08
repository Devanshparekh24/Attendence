import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationTab from './src/components/BottomNavigationTab';
import BiomatricScreen from './src/screens/BiomatricScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Biometric" component={BiomatricScreen} />
                <Stack.Screen name="MainApp" component={BottomNavigationTab} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
