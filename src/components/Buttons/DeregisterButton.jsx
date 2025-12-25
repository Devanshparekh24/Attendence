import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../backend';

const DeregisterButton = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { otp, employeeId, timer, setEmployeeId, setPassword, setConfirmPassword } = useAuth();
    const [loading, setLoading] = useState(false);

    // Get OTP sent from previous screen
    const sentOtp = route.params?.otp;

    const handleVerifyAndDeregister = async () => {
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

        // Verify OTP
        if (sentOtp && otpValue !== sentOtp.toString()) {
            Alert.alert('Error', 'Invalid OTP. Please try again.');
            return;
        }

        // Proceed to Deregister
        try {
            setLoading(true);

            // Call API to Deregister
            const response = await ApiService.deRegisterDevice({ emp_code: employeeId });
            if (response.success) {

                Alert.alert("Success", "Device deregistered successfully.", [
                    {
                        text: "OK",
                        onPress: () => {
                            // Clear Context / Storage if needed (handled by reset usually)
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],

                            });
                            //Reset fields        
                            setConfirmPassword('');
                            setEmployeeId('');
                            setPassword('');
                        }
                    }
                ]);
            } else {
                Alert.alert("Deregistration Failed", response.message || "Something went wrong.");
            }

        } catch (error) {
            console.error("Deregistration Error:", error);
            Alert.alert("Error", "An unexpected error occurred during deregistration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="w-full">
            <TouchableOpacity
                className={`w-full bg-red-600 rounded-lg py-4 mb-4 ${loading || timer === 0 ? 'opacity-50' : ''}`}
                onPress={handleVerifyAndDeregister}
                disabled={loading || timer === 0}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white text-center text-lg font-semibold">
                        {timer === 0 ? 'OTP Expired' : 'Verify & Deregister'}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default DeregisterButton