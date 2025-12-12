import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const RegisterButton = () => {
    const {
        employeeId, setEmployeeId,
        password, setPassword,
        showPassword, setShowPassword
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
    return (
        <View>
            {/* Register Button */}
            <TouchableOpacity
                className={`bg-blue-600 py-4 rounded-lg items-center mb-4 ${loading ? 'opacity-50' : ''
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

