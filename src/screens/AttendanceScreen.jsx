import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, ScrollView } from 'react-native';
import LocationButton from '../components/Buttons/LocationButton';
import GoogleMap from '../components/Map/GoogleMap';

const AttendanceScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Attendence App needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLocationChange = (location) => {
    console.log('Location received in AttendanceScreen:', location);
    setCurrentLocation(location);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <ScrollView contentContainerClassName="flex-grow">
      <View className="flex-1 ">
        <View className="justify-end items-center py-5 px-4">
          <LocationButton onLocationChange={handleLocationChange} />

          <GoogleMap location={currentLocation} />


        </View>
      </View>
    </ScrollView>
  );
};

export default AttendanceScreen;
