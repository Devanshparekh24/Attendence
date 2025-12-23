import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../backend';

const DeRegister = () => {
    const navigation = useNavigation();
    const { employeeId } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleInitiate = async () => {
        if (!employeeId) {
            Alert.alert("Error", "Employee ID not found.");
            return;
        }

        try {
            setLoading(true);
            const response = await ApiService.deRegisterDevice({ emp_code: employeeId });

            if (response.success && response.data?.otp) {
                Alert.alert("OTP Sent", "An OTP has been sent to your registered mobile number.", [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('DeRegisterOtp', {
                                otp: response.data.otp,
                                mobile: response.data.mobile // Ensure backend returns this or handle gracefully
                            });
                        }
                    }
                ]);
            } else {
                Alert.alert("Error", response.message || "Failed to initiate deregistration.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-white dark:bg-slate-900 px-4 py-6 justify-center">
            <View className="bg-blue-50 dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-4">

                <View className="border-b border-blue-200 dark:border-slate-700 pb-4 mb-4">
                    <Text className='text-xl font-bold text-red-600 dark:text-red-400'>
                        Deregister Account
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Are you sure you want to deregister?
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
                        This action cannot be undone. You will be logged out immediately.
                    </Text>
                </View>

                <View className='flex-row justify-end gap-3 pt-4 border-t border-blue-200 dark:border-slate-700'>

                    <TouchableOpacity
                        onPress={handleBack}
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg ${loading ? 'opacity-50' : ''}`}
                    >
                        <Text className='text-blue-600 font-semibold text-center'>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleInitiate}
                        disabled={loading}
                        className={`px-6 py-3 bg-red-600 rounded-lg ${loading ? 'opacity-50' : ''}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text className='text-white font-semibold text-center'>Deregister</Text>
                        )}
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default DeRegister