import { Alert, PermissionsAndroid, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { useLocation } from '../../context/LocationContext';
import { Platform } from 'react-native';
import { requestLocationPermission } from '../../utils/requestLocationPermission';
import { ApiService } from '../../backend';
import DeviceInfo from 'react-native-device-info';

const CheckOutButton = () => {
    const {
        location, setLocation,
        address, setAddress,
        error, setError,
        setLoading,
    } = useLocation();



    const handleCheckOut =async () => {
        console.log('Check Out start here');

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
                latitude_in: null,
                latitude_out: locationData.latitude,
                longitude_in: null,
                longitude_out: locationData.longitude,
                accuracy_in: null,
                accuracy_out: locationData.accuracy,
                android_id: await DeviceInfo.getAndroidId(),
                check_in: null,
                check_out: new Date(),
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
            console.error("Check-Out Error:", error);
            setError(error.message);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }


    }

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



    return (
        <View>
            <TouchableOpacity
                onPress={handleCheckOut}
                className='bg-primary-500 py-3 px-8 rounded-lg w-full items-center mb-2.5'>
                <Text className='text-primary-50 text-base font-semibold'> Check Out</Text>
            </TouchableOpacity>

        </View>
    )
}

export default CheckOutButton;

