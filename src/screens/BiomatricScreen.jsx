import React, { useEffect, useState } from 'react';
import { Text, View, BackHandler, Button, Image, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import Applogo from '../assets/images/Attendece_App_logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import CustomAlert from '../utils/CustomAlert';
import useStoreAuthData from '../hooks/storeAuthData';

const BiometricScreen = ({ navigation }) => {



    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
    const {
        employeeId,
        setEmployeeId,
        loginUser,   // ✅ ADD THIS

    } = useAuth();

    const storeAuthData = useStoreAuthData();

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

            await storeAuthData();

        } catch (error) {
            console.log('❌ Biometric error:', error);
            BackHandler.exitApp();
        }
    };

    const handleLoginwihoutbiomatric = async () => {

        try {

            await storeAuthData();

        } catch (error) {
            console.log('❌ Biometric error:', error);
            BackHandler.exitApp();
        }
    }


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center items-center px-6">

                <Image
                    source={Applogo}
                    className="w-24 h-24 mb-4"
                    resizeMode="contain"
                />
                <Text className="text-2xl font-bold mb-5">Attendance App</Text>

                {!biometricAvailable ? (
                    <View className="items-center w-full">
                        <Text className="text-base text-gray-800 mb-5 text-center">
                            Biometric authentication not available on this device.
                        </Text>
                        <Button title="Continue" onPress={handleLoginwihoutbiomatric} />

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