import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Applogo from '../assets/images/Attendece_App_logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegisterButton from '../components/Buttons/RegisterButton';
import { useAuth } from '../context/AuthContext';
import OtpButton from '../components/Buttons/VerifyButton';
import { ApiService } from '../../backend';
import VerifyButton from '../components/Buttons/VerifyButton';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    employeeId,
    setEmployeeId,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    confirmPassword,
    setConfirmPassword,
  } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 justify-center px-6 py-8">
              {/* Logo and Title */}
              <View className="items-center mb-10">
                <Image
                  source={Applogo}
                  className="w-24 h-24 mb-4"
                  resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome
                </Text>
                <Text className="text-base text-gray-600 text-center">
                  Sign in to continue to{' '}
                  <Text className="text-blue-500">SDC Attendance App</Text>
                </Text>
              </View>

              {/* Login Form */}
              <View className="w-full">
                {/* Employee ID Input */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Employee ID
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-800"
                    placeholder="Enter your Employee ID"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={employeeId}
                    onChangeText={setEmployeeId}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                </View>

                {/* Password Input */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </Text>

                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-800"
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-9"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <Ionicons name="eye" size={20} color="#6B7280" />
                    ) : (
                      <Ionicons name="eye-off" size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View className="mb-4">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-800"
                    placeholder="Re-enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-9"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <Ionicons name="eye" size={20} color="#6B7280" />
                    ) : (
                      <Ionicons name="eye-off" size={20} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>
                <VerifyButton />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;