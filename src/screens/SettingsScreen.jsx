import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import { ApiService } from '../backend'

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { employeeId } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (!employeeId) {
            Alert.alert("Error", "Employee ID not found.");
            return;
        }

        try {
            setLoading(true);
            const response = await ApiService.initiateDeregistration({ emp_code: employeeId });

            if (response.success && response.data?.otp) {
             
                navigation.navigate('DeRegisterOtp', {
                    otp: response.data.otp,
                    mobile: response.data.mobile // Ensure backend returns this or handle gracefully
                });
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

    const handleDeRegister = () => {

        navigation.navigate('DeRegisterOtp');
        handleSendOtp();



    }
    return (
        <View>
            <View>

                <TouchableOpacity onPress={handleDeRegister} className="px-4 py-3">
                    <Text className="text-lg font-semibold">De-Register</Text>
                </TouchableOpacity>

                <Divider />
                <Divider />
            </View>
        </View>
    )
}

export default SettingsScreen
