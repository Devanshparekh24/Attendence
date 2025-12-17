import { Alert, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { ApiService } from '../../backend'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterButton = () => {
    const {
        employeeId,
        password,
        confirmPassword,

    } = useAuth();

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleNavigateLogin = () => {
        try {
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);

        }
    }

    const handleRegister = async () => {

        try {
            setLoading(true);

            if (!employeeId || !password || !confirmPassword) {
                Alert.alert("Error", "All fields are required");
                return;
            }

            if (password === confirmPassword) {
                // Save employeeId and confirmPassword in AsyncStorage
                await AsyncStorage.setItem('employeeId', employeeId);
                await AsyncStorage.setItem('confirmPassword', confirmPassword);

                const storeUser = async () => {
                    try {
                        const dataStore = await AsyncStorage.setItem("userData", JSON.stringify(userData));
                        console.log("DataStore value", dataStore);
                        return dataStore;

                    } catch (error) {
                        console.log(error);
                    }
                };

                storeUser();
                // 🔴 VALIDATIONS
                const androidId = await DeviceInfo.getAndroidId();
                const DeviceName = await DeviceInfo.getDeviceNameSync();


                const payload = {
                    emp_code: employeeId,
                    android_id: androidId,
                    device_name: DeviceName,
                    emp_pass: confirmPassword,
                    from_date: new Date(),
                    to_date: null,
                };

                const response = await ApiService.createRegister(payload);

                console.log("register response", response);

                // 🔴 SHOW POPUP IF BACKEND SENDS ERROR
                if (!response.success) {
                    Alert.alert(
                        "Register Failed",
                        response.message || "Something went wrong!"
                    );
                    return;
                }

                // 🟢 On success
                Alert.alert("Success", "Registered Successfully!", [
                    {
                        text: "OK",
                        onPress: () => handleNavigateLogin()
                    }
                ]);

                // 🟢 Save data only after success
                const userData = {
                    emp_code: employeeId,
                    emp_pass: password,
                };


                // STORE

                await AsyncStorage.setItem("userData", JSON.stringify(userData));

                console.log("✅ Stored in AsyncStorage");

                // READ BACK
                const storedData = await AsyncStorage.getItem("userData");
                console.log("📦 AsyncStorage userData (raw):", storedData);

                const parsedData = JSON.parse(storedData);
                console.log("👤 Employee ID from storage:", parsedData.emp_code);
                console.log("🔐 Confirm Password from storage:", parsedData.emp_pass)


            } else {
                Alert.alert("Error", "Passwords do not match!");
            }


        } catch (error) {
            // For network or crash
            Alert.alert("Error", error.message || "Unexpected error");
        } finally {
            setLoading(false);
        }

    }







    return (
        <View>
            {/* Register Button */}
            <TouchableOpacity
                onPress={handleRegister}
                className={` mt-3 bg-blue-600 py-4 rounded-lg items-center mb-4 ${loading ? 'opacity-50' : ''
                    }`}
                disabled={loading}
            >
                <Text className="text-white text-base font-bold">
                    {loading ? 'Registering...' : 'Register'}
                </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center items-center mt-4">
                <Text className="text-sm text-gray-600">
                    Already have an account do{' '}
                </Text>
                <TouchableOpacity
                    disabled={loading}
                >
                    <Text onPress={handleNavigateLogin} className="text-sm font-bold text-blue-600">
                        Login
                    </Text>
                </TouchableOpacity>
            </View>    </View>
    )
}

export default RegisterButton

