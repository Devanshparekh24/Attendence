import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StatusCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  return (
    <View>
      <View className="mt-2 mb-6 bg-white rounded-xl shadow-md p-6">
        <View className="items-center">
          <View
            className={`mb-2 rounded-full p-4 ${isCheckedIn ? 'bg-green-100' : 'bg-blue-100'
              }`}
          >
            <Ionicons
              name={isCheckedIn ? 'checkmark-circle' : 'log-in'}
              size={50}
              color={isCheckedIn ? '#22c55e' : '#3b82f6'}
            />
          </View>

          <Text
            variant="headlineSmall"
            className="mt-4 font-semibold text-gray-900"
          >
            {isCheckedIn ? 'Checked In' : 'Not Checked In'}
          </Text>

          <Text variant="bodyMedium" className="mt-2 text-gray-600">
            
          </Text>
        </View>
      </View>{' '}
    </View>
  );
};

export default StatusCard;
