import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import React, { useRef, useState } from 'react'

const Otpauth = () => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

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

    const handleVerify = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 6) {
            Alert.alert('Success', `OTP Verified: ${otpValue}`);
        } else {
            Alert.alert('Error', 'Please enter all 6 digits');
        }
    };

    const handleResend = () => {
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        Alert.alert('OTP Resent', 'A new OTP has been sent to your phone');
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
            </View>

            {/* OTP Input Boxes */}
            <View className="flex-row justify-center gap-4 mb-8">
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-16 h-16 border-2 border-blue-300 rounded-lg text-center text-2xl font-bold text-gray-900"
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

            {/* Verify Button */}
            <TouchableOpacity
                className="w-full bg-blue-600 rounded-lg py-4 mb-4"
                onPress={handleVerify}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Verify OTP
                </Text>
            </TouchableOpacity>

            {/* Resend Container */}
            <View className="flex-row justify-center items-center gap-2">
                <Text className="text-gray-600">Didn't receive the code?</Text>
                <TouchableOpacity onPress={handleResend}>
                    <Text className="text-blue-600 font-semibold">Resend</Text>
                </TouchableOpacity>
            </View>

            {/* Timer (optional) */}
            <Text className="text-gray-500 text-sm mt-6">
                Resend OTP in 30 seconds
            </Text>
        </View>
    )
}

export default Otpauth