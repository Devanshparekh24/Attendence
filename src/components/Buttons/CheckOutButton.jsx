import { Alert, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Geolocation from '@react-native-community/geolocation'
import { useLocation } from '../../context/LocationContext';
import { requestLocationPermission } from '../../utils/requestLocationPermission';
import { ApiService } from '../../backend';

const CheckOutButton = () => {
    const {
        setLocation,
        setError,
        setLoading,
    } = useLocation();



    const handleCheckOut = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Starting Check-Out process...');
            const locationData = await getCurrentLocationPromise();
            console.log('Location obtained:', locationData);

            // Update context state for display if needed
            setLocation(locationData);

            const payload = {
                employee_id: 3, // TODO: Get actual employee ID from context/auth
                latitude_out: locationData.latitude,
                longitude_out: locationData.longitude,
                accuracy_out: locationData.accuracy,
                check_out: new Date(),
            };

            console.log("Payload:", payload);
            // Call the new stateless checkout endpoint
            const response = await ApiService.checkout(payload);

            if (response.success) {
                Alert.alert("Success", "Checked Out Successfully!");
                console.log("Check Out response", response);
            } else {
                throw new Error(response.error || "Frist Do Check In then 'Click Out' ");
            }

        } catch (error) {
            console.error("Check-Out Error:", error);
            setError(error.message);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

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

