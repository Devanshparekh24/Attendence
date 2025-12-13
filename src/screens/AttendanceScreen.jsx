// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, PermissionsAndroid, ScrollView } from 'react-native';
// import LocationButton from '../components/Buttons/LocationButton';
// import GoogleMap from '../components/Map/GoogleMap';
// import CheckInButton from '../components/Buttons/CheckInButton';
// import CheckOutButton from '../components/Buttons/CheckOutButton';

// const AttendanceScreen = () => {



//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message:
//             'Attendence App needs access to your location ',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the Location');
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };



//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   return (
//     <ScrollView contentContainerClassName="flex-grow">
//       <View className="flex-1 ">
//         <View className="justify-end items-center py-5 px-4">
//           <LocationButton />
//           <View className='flex-row  gap-7 pt-7'>
//             <CheckInButton />
//             <CheckOutButton />
//           </View>


//           <GoogleMap />

//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default AttendanceScreen;



import { ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';

const AttendanceScreen = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-4 pt-2"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View className="mb-6 mt-2">
        <Text variant="headlineMedium" className="font-semibold text-gray-900">
          Attendance
        </Text>
      </View>

      {/* Status Card */}
      <View className="mb-4 bg-white rounded-xl shadow-md p-6">
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
            {currentTime}
          </Text>
        </View>
      </View>

      {/* Check In/Out Card */}
      <View className="mb-6 bg-white rounded-xl shadow-md p-6">
        <View className="flex-row items-center justify-around">
          {/* Check In */}
          <View className="flex-1 items-center">
            <View className="mb-2 rounded-xl bg-blue-100 p-3">
              <Ionicons name="log-in-outline" size={28} color="#3b82f6" />
            </View>
            <Text variant="bodySmall" className="mt-1 font-medium text-gray-900">
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
            <Text variant="bodySmall" className="mt-1 font-medium text-gray-900">
              Check Out
            </Text>
            <Text variant="labelSmall" className="mt-1 text-gray-500">
              --:-- --
            </Text>
          </View>
        </View>
      </View>

      {/* Main Action Button */}
      <Button
        mode={isCheckedIn ? 'contained' : 'outlined'}
        onPress={() => setIsCheckedIn(!isCheckedIn)}
        className="mb-6"
        icon={() => (
          <Ionicons
            name={isCheckedIn ? 'log-out' : 'log-in'}
            size={20}
            color={isCheckedIn ? 'white' : '#3b82f6'}
          />
        )}
      >
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </Button>

      {/* History Card */}
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
      </View>
    </ScrollView>
  )
}

export default AttendanceScreen

