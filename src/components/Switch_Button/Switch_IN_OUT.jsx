import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import { ApiService } from '../../backend'
import { requestLocationPermission } from '../../utils/requestLocationPermission';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import DeviceInfo from 'react-native-device-info';
import useGetCheckInOut from '../../hooks/getCheckInOut';

const Switch_IN_OUT = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  var eventfire = false;
  const {
    isCheckedIn,
    setIsCheckedIn,
    location,
    setLocation,
    refreshCheckInOut
  } = useLocation();
  const { employeeId } = useAuth();


  const RefreshAtt = useGetCheckInOut();

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

      // Validate employee ID
      if (!employeeId || employeeId.trim() === '') {
        throw new Error('Employee ID is required. Please log in again.');
      }

      const locationData = await getCurrentLocationPromise();
      console.log('Location obtained:', locationData);

      // Update context state for display if needed
      setLocation(locationData);

      const payload = {
        emp_code: employeeId,
        latitude_in: locationData.latitude,
        latitude_out: null,
        longitude_in: locationData.longitude,
        longitude_out: null,
        accuracy_in: locationData.accuracy,
        accuracy_out: null,
        android_id: await DeviceInfo.getAndroidId(),
        check_in: new Date(),
        check_out: null,
        Is_Visit: 0,
      };

      console.log("Payload:", payload);
      const response = await ApiService.createAttendance(payload);

      if (response.success) {
        // Alert.alert("Success", "Checked In Successfully!");
        console.log("✅ Check In response", response.data);
      }
      else {
        throw new Error(response.message);

      }

    }
    catch (error) {
      console.error("Check-In Error:", error);
      setError(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckOut = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Starting Check-Out process...');

      // Validate employee ID
      if (!employeeId || employeeId.trim() === '') {
        throw new Error('Employee ID is required. Please log in again.');
      }

      const locationData = await getCurrentLocationPromise();
      console.log('Location obtained:', locationData);

      // Update context state for display if needed
      setLocation(locationData);

      const payload = {
        emp_code: employeeId,
        latitude_out: locationData.latitude,
        longitude_out: locationData.longitude,
        accuracy_out: locationData.accuracy,
        check_out: new Date(),
        Is_Visit: 0,

      };

      console.log("Payload:", payload);
      // Call the new stateless checkout endpoint
      const response = await ApiService.checkout(payload);

      if (response.success) {
        console.log("✅ Check Out response", response);

      } else {
        // Show the actual error message from backend
        const errorMsg = response.message || response.error ;
        console.error("❌ Checkout failed:", errorMsg);
        console.error("❌ Full response:", response);
        throw new Error(errorMsg);
      }

    } catch (error) {
      console.error("Check-Out Error:", error);
      setError(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  const onValueChange = async (value) => {
    try {
      if (value) {
        console.log("Check IN");
        setIsCheckedIn(true);

        await handleCheckIn();   // ⏳ wait for API success
      } else {
        console.log("Check Out");
        setIsCheckedIn(false);

        await handleCheckOut();  // ⏳ wait for API success
      }

      console.log("🔄 Refreshing attendance");
      await RefreshAtt();        // ✅ now fetches latest data

    } catch (err) {
      console.log('onValueChange error:', err);
    }
  };


  return (


    <View className="mb-6 flex-row items-center justify-between py-3 px-4 bg-gray-100 rounded-xl">
      <View className="flex-row items-center">
        <Ionicons
          name="log-out"
          size={24}
          color={!isCheckedIn ? '#FF2C2C' : '#6b7280'}
        />
        <Text className={`ml-2 text-base font-medium ${!isCheckedIn ? 'text-green-600' : 'text-gray-500'}`}>
          Check Out
        </Text>
      </View>

      <Switch
        value={isCheckedIn}
        onValueChange={onValueChange}
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
