import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../backend';
import DeviceInfo from 'react-native-device-info';

const VerifyRegisterButton = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { otp, setOtp, employeeId, confirmPassword, timer } = useAuth();
    const [loading, setLoading] = useState(false);

    // Get OTP from navigation params (passed from previous screen)
    const sentOtp = route.params?.otp;

    const handleVerifyAndRegister = async () => {
        // Check for expiry
        if (timer === 0) {
            Alert.alert("Expired", "This OTP has expired. Please request a new one.");
            return;
        }

        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            Alert.alert('Error', 'Please enter all 6 digits');
            return;
        }

        // 1. Verify OTP
        if (sentOtp && otpValue !== sentOtp.toString()) {
            Alert.alert('Error', 'Invalid OTP. Please try again.');
            return;
        }

        // 2. Proceed to Registration
        try {
            setLoading(true);
            const androidId = await DeviceInfo.getAndroidId();
            const deviceName = await DeviceInfo.getDeviceName();

            const payload = {
                emp_code: employeeId,
                android_id: androidId,
                device_name: deviceName,
                emp_pass: confirmPassword,
                from_date: new Date(),
                to_date: null,
            };

            console.log("Registering with payload:", payload);
            const response = await ApiService.createRegister(payload);

            if (response.success) {
                Alert.alert("Success", "Registered Successfully!", [
                    {
                        text: "OK",
                        onPress: () => navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainApp' }],
                        })
                    }
                ]);
                setOtp(['', '', '', '', '', '']);
            } else {
                Alert.alert("Registration Failed", response.message || "Something went wrong during registration.");
            }

        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Error", "An unexpected error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="w-full">
            <TouchableOpacity
                className={`w-full bg-blue-600 rounded-lg py-4 mb-4 ${loading || timer === 0 ? 'opacity-50' : ''}`}
                onPress={handleVerifyAndRegister}
                disabled={loading || timer === 0}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    {loading ? 'Verifying...' : timer === 0 ? 'OTP Expired' : 'Verify & Register'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default VerifyRegisterButton;
