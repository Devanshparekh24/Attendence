import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useRef, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { ApiService } from '../backend';
import DeregisterButton from '../components/Buttons/DeregisterButton';

const DeRegisterOtp = () => {

    // Use global state from context
    const { otp, setOtp, employeeId, timer, setTimer } = useAuth();

    const inputRefs = useRef([]);
    const route = useRoute();
    const navigation = useNavigation();

    // Get mobile from navigation params for display
    const mobileNumber = route.params?.mobile;

    // Timer state (2 minutes = 120 seconds)
    // const [timer, setTimer] = useState(120);

    // Timer effect
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer, setTimer]);

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const handleOtpChange = (value, index) => {
        // Only accept numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = async () => {
        try {
            inputRefs.current[0]?.focus();
            setTimer(120); // Reset timer

            // Call verifyUser again to regenerate and resend OTP
            // We need employeeId from context
            const response = await ApiService.initiateDeregistration({ emp_code: employeeId });

            if (response.success && response.data?.otp) {

                Alert.alert('OTP Resent', `A new OTP has been sent.`);

                console.log("OTP Resent", response.data.otp);

                // Navigation setParams to update the otp in the current screen's route params
                navigation.setParams({ otp: response.data.otp });

            } else {
                Alert.alert('Error', response.message || 'Failed to resend OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while resending OTP');
            console.error(error);
        }
    };

    return (
        <View className="flex-1 bg-white justify-center items-center px-6">
            {/* Header */}
            <View className="mb-8 items-center">
                <Text className="text-3xl font-bold text-gray-900 mb-2">
                    Verify OTP
                </Text>
                <Text className="text-base text-gray-600 text-center">
                    Enter the 6-digit code sent to your phone
                </Text>
                {mobileNumber ? (
                    <Text className="text-sm text-gray-500 mt-2 ">
                        OTP sent on this number <Text className='font-bold text-blue-600'> {mobileNumber} </Text>
                    </Text>
                ) : null}
            </View>

            {/* OTP Input Boxes */}
            <View className="flex-row justify-center gap-4 mb-8">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-10 h-16 border-2 border-blue-300 rounded-lg text-center text-2xl font-bold text-gray-900"
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        placeholderTextColor="#9CA3AF"
                        selectionColor="#3B82F6"
                    />
                ))}
            </View>

            {/* Deregister Button Component */}
            <DeregisterButton />
            {/* Resend Container */}
            <View className="flex-row justify-center items-center gap-2 mt-4">
                <Text className="text-gray-600">Didn't receive the code?</Text>
                <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                    <Text className={`font-semibold ${timer > 0 ? 'text-gray-400' : 'text-blue-600'}`}>
                        {timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeRegisterOtp