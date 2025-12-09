import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';

import { ApiService } from '../../backend'
import { useLocation } from '../../context/LocationContext';
const CheckInButton = () => {
      const {
        location, setLocation,
        address, setAddress,
        error, setError
      } = useLocation();
      const [loading, setLoading] = useState(false);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'App needs access to your location for check-in',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const handleCheckIn = async () => {
        setLoading(true);
        setError(null);

        try {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                setError('Location permission denied');
                setLoading(false);
                return;
            }

            Geolocation.getCurrentPosition(
        (position) => {
          console.log("FAST position:", position);
          const { latitude, longitude, accuracy, speed } = position.coords;
          const locationData = { latitude, longitude, accuracy, speed };
          setLocation(locationData);

          getAddressFromCoords(latitude, longitude);
          setLoading(false);
        },
        (err) => {
          console.log("ERROR:", err);
          // Retry with HIGH ACCURACY only if first attempt fails
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("HIGH ACCURACY position:", position);
              const { latitude, longitude, accuracy, speed } = position.coords;
              const locationData = { latitude, longitude, accuracy, speed };
              setLocation(locationData);

              getAddressFromCoords(latitude, longitude);
              setLoading(false);
            },
            (retryErr) => {
              console.log("Retry failed:", retryErr);
              setError("Unable to get location. Ensure GPS is ON and try again.");
              setLoading(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 8000,
              maximumAge: 0,
              forceRequestLocation: true,
              showLocationDialog: true,
            }
          );
        },
        {
          enableHighAccuracy: false, // FASTEST
          timeout: 4000, // Don't wait too long
          maximumAge: 60000, // Accept cached location up to 1 minute
        }
      );

        } catch (err) {
            console.error('Unexpected error:', err);
            setError('An error occurred');
            setLoading(false);
        }
    }

    return (
        <View>
            <TouchableOpacity
                onPress={handleCheckIn}
                disabled={loading}
                className={`bg-primary-500 py-3 px-8 rounded-lg w-full items-center mb-2.5 ${loading ? 'opacity-70' : ''}`}>
                <Text className='text-primary-50 text-base font-semibold'>
                    {loading ? 'Checking In...' : 'Check In'}
                </Text>
            </TouchableOpacity>
            {error && <Text className="text-red-500 text-center mt-1">{error}</Text>}
        </View>
    )
}

export default CheckInButton

