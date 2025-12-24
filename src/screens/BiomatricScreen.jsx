import React, { useEffect, useState } from 'react';
import { Text, View, BackHandler, Button, Image, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import Applogo from '../assets/images/Attendece_App_logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import CustomAlert from '../utils/CustomAlert';


const BiometricScreen = ({ navigation }) => {
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const rnBiometrics = new ReactNativeBiometrics();
    const {
        employeeId,
        setEmployeeId,
        loginUser,   // ✅ ADD THIS

    } = useAuth();

    useEffect(() => {
        rnBiometrics.isSensorAvailable()
            .then((resultObject) => {
                const { available, biometryType } = resultObject;

                if (available && biometryType) {
                    setBiometricAvailable(true);
                    console.log('Biometric available:', biometryType);
                    handleBiometricAuth();
                } else {
                    setBiometricAvailable(false);
                    console.log('Biometric not available');
                }
            });
    }, []);

    

    const handleBiometricAuth = async () => {
        try {
            const { success } = await rnBiometrics.simplePrompt({
                promptMessage: 'Confirm identity',
            });
            
            if (!success) {
                console.log('❌ User cancelled biometric');
                BackHandler.exitApp();
                return;
            }

            console.log('✅ Biometric success');

            // 🔍 Read AsyncStorage ONCE
            const storedData = await AsyncStorage.getItem('userData');
            console.log('📦 AsyncStorage userData:', storedData);

            if (!storedData) {
                // 🔴 No stored user → Login
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                return;
            }

            // 🟢 Safe parse
            const parsedData = JSON.parse(storedData);
            console.log('👤 Employee ID:', parsedData.emp_code);

            // 🟢 Update context
            setEmployeeId(parsedData.emp_code);

            const response = await loginUser(
                parsedData.emp_code,
                parsedData.emp_pass   // ⚠️ make sure key name is correct
            );

            if (response.success) {
                setEmployeeId(parsedData.emp_code);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                });
            } else {
                console.log('❌ Stored credentials invalid');

                CustomAlert.alert(
                'Login Failed',
                response.message || 'Invalid credentials'
                );
                // optional: clear storage
                // await AsyncStorage.removeItem('userData');

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }


        } catch (error) {
            console.log('❌ Biometric error:', error);
            BackHandler.exitApp();
        }
    };


    const handleExist = () => {

        try {
            BackHandler.exitApp();

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center items-center px-6">
                <Text className="text-2xl font-bold mb-5">Attendance App</Text>

                {!biometricAvailable ? (
                    <View className="items-center w-full">
                        <Text className="text-base text-gray-800 mb-5 text-center">
                            Biometric not available on this device.
                        </Text>
                        <Button title="Exist" onPress={handleExist} />
                    </View>
                ) : (
                    <View className="items-center w-full">
                        <Image
                            source={Applogo}
                            className="w-24 h-24 mb-4"
                            resizeMode="contain"
                        />
                        <Text className="text-base text-gray-800 mb-5 text-center">
                            Authenticate to continue
                        </Text>
                        <Button title="Retry Biometric" onPress={handleBiometricAuth} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default BiometricScreen;