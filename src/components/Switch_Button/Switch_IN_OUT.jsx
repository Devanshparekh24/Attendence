import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Switch_IN_OUT = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  return (
    <View className="mb-6 flex-row items-center justify-between py-3 px-4 bg-gray-100 rounded-xl">
      <View className="flex-row items-center">
        <Ionicons
          name="log-out"
          size={24}
          color={!isCheckedIn ? '#831f1f' : '#6b7280'}
        />
        <Text className={`ml-2 text-base font-medium ${!isCheckedIn ? 'text-green-600' : 'text-gray-500'}`}>
          Check Out
        </Text>
      </View>
      
      <Switch
        value={isCheckedIn}
        onValueChange={setIsCheckedIn}
        color="#10b981"
      />
      
      <View className="flex-row items-center">
        <Text className={`mr-2 text-base font-medium ${isCheckedIn ? 'text-green-600' : 'text-gray-500'}`}>
          Check In
        </Text>
        <Ionicons
          name="log-in"
          size={24}
          color={isCheckedIn ? '#10b981' : '#6b7280'}
        />
      </View>
    </View>
  );
};

export default Switch_IN_OUT;