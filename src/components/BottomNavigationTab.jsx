import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import Demo from '../screens/Demo';
import AttendanceScreen from '../screens/AttendanceScreen';
import SettingsScreen from '../screens/SettingsScreen'; 

const BottomTab = createBottomTabNavigator();


const BottomNavigationTab = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Demo') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'AttendanceScreen') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }else if (route.name === 'SettingsScreen') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } 

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                headerShown: true,
                tabBarStyle: { paddingBottom: 5, height: 60 }
            })}
        >
            <BottomTab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
            <BottomTab.Screen name="Demo" component={Demo} options={{ title: 'Demo' }} />
            <BottomTab.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ title: 'Attendance' }} />
            <BottomTab.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
        </BottomTab.Navigator>
    )
}

export default BottomNavigationTab

