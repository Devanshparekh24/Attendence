import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';

const StatusCard = () => {
  const { employeeId } = useAuth();

  const {
    checkInTime,
    checkOutTime,
  } = useLocation();

  return (
    <View>
      <View className="mt-2 mb-6 bg-white rounded-xl shadow-md p-6">
        <View className="items-center">

          <View
            className={`mb-2 rounded-full p-4 ${
              checkInTime && !checkOutTime ? 'bg-green-100' : 'bg-blue-100'
            }`}
          >
            <Ionicons
              name={checkInTime && !checkOutTime ? 'checkmark-circle' : 'log-out'}
              size={50}
              color={checkInTime && !checkOutTime ? '#22c55e' : '#3b82f6'}
            />
          </View>

          <Text className="mt-4 font-semibold text-gray-900">
            {checkInTime && !checkOutTime
              ? 'Checked In'
              : 'Checked Out'}
          </Text>

          <Text className="mt-2 text-gray-600">
            {/* optional message */}
            {checkOutTime ? 'Today Session completed' : ''}
          </Text>

        </View>
      </View>
    </View>
  );
};

export default StatusCard;
