import { View, Text } from 'react-native';
// import React, { useEffect, useState, useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiService } from '../../backend';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import formatTime from '../../utils/formatTime';
import useGetCheckInOut from '../../hooks/getCheckInOut';

const CheckInOutCard = () => {
  const { employeeId } = useAuth();
  const {
    checkInTime,
    setCheckInTime,
    checkOutTime,
    setCheckOutTime,
    setIsCheckedIn,
    setRefreshCheckInOut
  } = useLocation();

  const getCheckINOut = useGetCheckInOut();

  console.log('🎨 CheckInOutCard rendered');
  console.log('🎨 Current checkInTime:', checkInTime);
  console.log('🎨 Current checkOutTime:', checkOutTime);
 
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
              {checkInTime}
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
              {checkOutTime}
            </Text>
          </View>
        </View>
      </View>{' '}
    </View>
  );
};



export default CheckInOutCard;

