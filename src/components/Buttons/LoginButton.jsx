import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native'
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';


const LoginButton = () => {
    const [loading, setLoading] = useState(false);
    const navigation=useNavigation();

    const {
        employeeId, setEmployeeId,
        password, setPassword,
        showPassword, setShowPassword
    } = useAuth();
    
    const handleLogin = async () => {
        // Validate inputs
        if (!employeeId.trim()) {
            Alert.alert('Validation Error', 'Please enter your Employee ID');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Validation Error', 'Please enter your password');
            return;
        }

        setLoading(true);

        try {
            // TODO: Implement actual login API call
            console.log('Login attempt:', { employeeId, password: '***' });

            // Simulated API call - Replace with actual authentication
            // const response = await ApiService.login({ employeeId, password });

            // For now, simulate success after 1 second
            setTimeout(() => {
                setLoading(false);
                Alert.alert('Success', 'Login successful!');
                // Navigate to main app after successful login
                // navigation.replace('MainApp');
            }, 1000);

        } catch (error) {
            setLoading(false);
            console.error('Login Error:', error);
            Alert.alert('Login Failed', error.message || 'Invalid credentials');
        }


    };

    const handleNavigatetoRegister = () => {
        try {

            console.log('Navigate to Register');
            navigation.navigate('Register');

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <View>
            {/* Login Button */}
            <TouchableOpacity
                onPress={handleLogin}
                className={`bg-blue-600 py-4 rounded-lg items-center mb-4 ${loading ? 'opacity-50' : ''
                    }`}
                disabled={loading}
            >
                <Text className="text-white text-base font-bold">
                    {loading ? 'Logging in...' : 'Login'}
                </Text>
            </TouchableOpacity>
            {/* Register Link */}
            <View className="flex-row justify-center items-center mt-4">
                <Text className="text-sm text-gray-600">
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                    onPress={handleNavigatetoRegister}
                    disabled={loading}
                >
                    <Text onPress={handleNavigatetoRegister} className="text-sm font-bold text-blue-600">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginButton

