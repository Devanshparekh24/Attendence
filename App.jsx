import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigationTab from './src/components/BottomNavigationTab';

const App = () => {
    return (
        <NavigationContainer>
            <BottomNavigationTab />
        </NavigationContainer>
    );
};

export default App;
