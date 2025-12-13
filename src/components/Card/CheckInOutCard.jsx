import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CheckInOutCard = () => {
  return (
    <View>
      <View className="mb-6 bg-white rounded-xl shadow-md p-6">
        <View className="flex-row items-center justify-around">
          {/* Check In */}
          <View className="flex-1 items-center">
            <View className="mb-2 rounded-xl bg-blue-100 p-3">
              <Ionicons name="log-in-outline" size={28} color="#3b82f6" />
            </View>
            <Text
              variant="bodySmall"
              className="mt-1 font-medium text-gray-900"
            >
              Check In
            </Text>
            <Text variant="labelSmall" className="mt-1 text-gray-500">
              09:00 AM
            </Text>
          </View>

          {/* Divider */}
          <View className="mx-3 h-16 w-px bg-gray-300" />

          {/* Check Out */}
          <View className="flex-1 items-center">
            <View className="mb-2 rounded-xl bg-orange-100 p-3">
              <Ionicons name="log-out-outline" size={28} color="#ff9800" />
            </View>
            <Text
              variant="bodySmall"
              className="mt-1 font-medium text-gray-900"
            >
              Check Out
            </Text>
            <Text variant="labelSmall" className="mt-1 text-gray-500">
              --:-- --
            </Text>
          </View>
        </View>
      </View>{' '}
    </View>
  );
};

export default CheckInOutCard;
