import React, { useEffect, useState } from 'react';
import { Text, View, BackHandler, Button, StyleSheet, Image } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Applogo from '../assets/images/Attendece_App_logo.png'

const BiomatricScreen = ({ navigation }) => {
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
                    // Navigate to the Main App (Bottom Tabs)
                    navigation.replace('MainApp');
                } else {
                    console.log('user cancelled biometric prompt');
                    BackHandler.exitApp();
                }
            })
            .catch(() => {
                console.log('biometrics failed');
            });
    };

    const handleMPINAuth = () => {
        // Placeholder for MPIN logic
        console.log('Navigate to MPIN');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Attendance App</Text>

            {!biometricAvailable ? (
                <View>
                    <Text style={styles.text}>Biometric not available on this device.</Text>
                    <Button title="Login with MPIN" onPress={handleMPINAuth} />
                </View>
            ) : (
                <View style={styles.authContainer}>
                    <Image source={Applogo} style={styles.logo} />
                    <Text style={styles.text}>Authenticate to continue</Text>
                    <Button title="Retry Biometric" onPress={handleBiometricAuth} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    authContainer: {
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    logo: {
        width: 50,
        height: 50
    }
});

export default BiomatricScreen;

