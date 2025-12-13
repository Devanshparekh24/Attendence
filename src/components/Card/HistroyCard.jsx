import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HistroyCard = () => {
  return (
    <View>
      <View className="bg-white rounded-xl shadow-md p-4">
        {/* Card Header */}
        <View className="flex-row items-center mb-4">
          <Ionicons name="time-outline" size={24} color="#666" />
          <Text className="ml-3 text-base font-medium text-gray-900">
            Today's History
          </Text>
        </View>

        {/* History Content */}
        <View className="flex-row items-start">
          {/* Timeline Dot */}
          <View className="mt-1 mr-3 h-3 w-3 rounded-full bg-green-500" />

          {/* History Info */}
          <View className="flex-1">
            <Text variant="bodySmall" className="font-semibold text-gray-900">
              Checked In
            </Text>
            <Text variant="labelSmall" className="mt-1 text-gray-500">
              09:00 AM • Today
            </Text>
          </View>
        </View>
      </View>{' '}
    </View>
  );
};

export default HistroyCard;
