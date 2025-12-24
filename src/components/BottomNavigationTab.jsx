import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import VisitScreen from '../screens/VisitScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Demo from '../screens/Demo'; // Keeping Demo if needed, or replace/remove



const BottomTab = createBottomTabNavigator();

const SCREENS = {
  Home: {
    component: HomeScreen,
    label: 'Home',
    icon: 'home',
  },
  Attendance: {
    component: AttendanceScreen,
    label: 'Attendance',
    icon: 'calendar',
  },
  // Visit: {
  //   component: VisitScreen,
  //   label: 'Visit',
  //   icon: 'location',
  // },
  Demo: {
    component: Demo,
    label: 'Attendence List',
    icon: 'list',
  },
  Settings: {
    component: SettingsScreen,
    label: 'Settings',
    icon: 'settings',
  },
};

const BottomNavigationTab = () => {

  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom, // 🔥 main fix
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#e0e0e0',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginBottom: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const screenConfig = SCREENS[route.name];
          if (!screenConfig) return null;

          const iconName = focused
            ? screenConfig.icon
            : `${screenConfig.icon}-outline`;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {Object.entries(SCREENS).map(([name, config]) => (
        <BottomTab.Screen
          key={name}
          name={name}
          component={config.component}
          options={{
            title: config.label,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default BottomNavigationTab;
