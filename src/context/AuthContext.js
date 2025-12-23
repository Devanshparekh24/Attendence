import React, { createContext, useState, useContext } from 'react';
import DeviceInfo from 'react-native-device-info';
import { ApiService } from '../backend';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // 🔹 Auth States
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
      const [timer, setTimer] = useState(120);
  

  // 🔹 CENTRALIZED LOGIN FUNCTION (IMPORTANT)
  const loginUser = async (empId, empPass) => {
    try {
      const androidId = await DeviceInfo.getAndroidId();
      const deviceName = await DeviceInfo.getDeviceName();

      console.log('🔐 loginUser()', {
        empId,
        empPass,
        androidId,
        deviceName,
      });

      const response = await ApiService.checkLogin({
        employeeId: empId,
        password: empPass,
        androidId,
        deviceName,
      });

      return response;
    } catch (error) {
      console.log('❌ loginUser error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // states
        employeeId,
        setEmployeeId,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword,
        setShowPassword,
        phoneNumber,
        setPhoneNumber,
        otp,
        setOtp,

        // functions
        loginUser,

        // Timer
        timer,
        setTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
