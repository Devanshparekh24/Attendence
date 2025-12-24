import './global.css';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigationTab from './src/components/BottomNavigationTab';
import BiomatricScreen from './src/screens/BiomatricScreen';
import { AppRegistry, AppState } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { LocationProvider } from './src/context/LocationContext';
import { AuthProvider } from './src/context/AuthContext';

import Login from './src/auth/Login';
import Register from './src/auth/Register';
import Otpauth from './src/auth/Otpauth';
import DeRegisterOtp from './src/auth/DeRegisterOtp';

const Stack = createNativeStackNavigator();

const App = () => {
  const appState = useRef(AppState.currentState);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Biometric' }],
          });
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [navigationRef]);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <LocationProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Biometric" component={BiomatricScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="OtpScreen" component={Otpauth} />
                <Stack.Screen name="MainApp" component={BottomNavigationTab} />
                <Stack.Screen name="DeRegisterOtp" component={DeRegisterOtp} />

              </Stack.Navigator>
            </NavigationContainer>
          </LocationProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
