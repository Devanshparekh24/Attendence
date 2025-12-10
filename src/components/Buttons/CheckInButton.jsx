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
                        message: 'Attendence App needs access to your location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission granted');
                    return true;
                } else {
                    console.log('Location permission denied');
                    setError('Permission denied');
                    return false;
                }
            } catch (err) {
                console.error('Permission error:', err);
                setError('Permission error');
                return false;
            }
        }
        return true;
    };


    // Get Current Location wrapped in Promise
    const getCurrentLocationPromise = () => {
        return new Promise(async (resolve, reject) => {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                reject(new Error('Location permission denied'));
                return;
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy, speed } = position.coords;
                    resolve({ latitude, longitude, accuracy, speed });
                },
                (err) => {
                    console.log("Fast location failed, retrying with high accuracy...", err);
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude, accuracy, speed } = position.coords;
                            resolve({ latitude, longitude, accuracy, speed });
                        },
                        (retryErr) => {
                            reject(new Error("Unable to get location. Ensure GPS is ON."));
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 0,
                            forceRequestLocation: true,
                            showLocationDialog: true,
                        }
                    );
                },
                {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 10000,
                }
            );
        });
    };

    const handleCheckIn = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Starting Check-In process...');
            const locationData = await getCurrentLocationPromise();
            console.log('Location obtained:', locationData);

            // Update context state for display if needed
            setLocation(locationData);

            const payload = {
                employee_id: 1, // TODO: Get actual employee ID from context/auth
                latitude_in: locationData.latitude,
                latitude_out: null,
                longitude_in: locationData.longitude,
                longitude_out: null,
                accuracy_in: locationData.accuracy,
                accuracy_out: null,
                android_id: await DeviceInfo.getAndroidId(),
                check_in: new Date(),
                check_out: null,
            };

            console.log("Payload:", payload);
            const response = await ApiService.createAttendance(payload);

            if (response.success) {
                Alert.alert("Success", "Checked In Successfully!");
                console.log("Check In response", response.data);
            } else {
                throw new Error(response.error || "Check-in failed");
            }

        } catch (error) {
            console.error("Check-In Error:", error);
            setError(error.message);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };



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

