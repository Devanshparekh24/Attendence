import React, { useEffect, useState } from 'react';
import { Text, View, BackHandler, Button, Image } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import Applogo from '../assets/images/Attendece_App_logo.png';

const BiometricScreen = ({ navigation }) => {
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const rnBiometrics = new ReactNativeBiometrics();

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

    const handleBiometricAuth = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm identity' })
            .then((resultObject) => {
                const { success } = resultObject;

                if (success) {
                    console.log('successful biometrics provided');
                    navigation.replace('Login');
                    // Navigate to the Main App (Bottom Tabs)
                } else {
                    console.log('user cancelled biometric prompt');
                    BackHandler.exitApp();
                    // navigation.replace('MainApp');
                }
            })
            .catch(() => {
                console.log('biometrics failed');
            });
    };

    const handleExist = () => {

        try {
            // BackHandler.exitApp();
                    navigation.replace('MainApp');

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