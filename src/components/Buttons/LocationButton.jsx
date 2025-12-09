import { View, Text, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';

function LocationButton({ onLocationChange }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

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

  const getCurrLocation = async () => {
    setLoading(true);
    setError(null);
    setLocation(null);
    console.log('Button clicked - getting location');

    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      console.log('Calling Geolocation.getCurrentPosition');

      Geolocation.getCurrentPosition(
        (position) => {
          console.log("FAST position:", position);
          const { latitude, longitude, accuracy, speed } = position.coords;
          const locationData = { latitude, longitude, accuracy, speed };
          setLocation(locationData);
          if (onLocationChange) {
            onLocationChange(locationData);
          }
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
              if (onLocationChange) {
                onLocationChange(locationData);
              }
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
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Unexpected error: ' + error.message);
      setLoading(false);
    }
  };

  // Native Reverse Geocoding using react-native-geocoder-reborn (like Android's Geocoder class)
  const getAddressFromCoords = async (lat, lon) => {
    console.log("Calling Native Geocoder with:", lat, lon);
    try {
      const results = await Geocoder.geocodePosition({ lat, lng: lon });
      console.log("Geocoder Response:", JSON.stringify(results));

      if (results && results.length > 0) {
        const addr = results[0];
        // Build exact location string
        let exactLocation = "";
        if (addr.streetNumber) exactLocation += addr.streetNumber + ", ";
        if (addr.streetName) exactLocation += addr.streetName;
        if (!exactLocation && addr.subLocality) exactLocation = addr.subLocality;

        const addressInfo = {
          exactLocation: exactLocation || "",
          street: addr.streetName || "",
          area: addr.subLocality || addr.subAdminArea || "",
          city: addr.locality || addr.subAdminArea || "",
          district: addr.subAdminArea || "",
          state: addr.adminArea || "",
          country: addr.country || "",
          pincode: addr.postalCode || "",
          fullAddress: addr.formattedAddress || ""
        };

        console.log("Setting Address:", addressInfo);
        setAddress(addressInfo);
      } else {
        console.log("No address data found");
        setAddress(null);
      }
    } catch (err) {
      console.log("Reverse Geocoding Error:", err);
      setAddress(null);
    }
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        className='bg-secondary-400 py-3 px-8 rounded-lg w-full items-center mb-2.5'
        onPress={getCurrLocation}
        disabled={loading}
      >
        <Text className="text-secondary-50 text-base font-semibold">
          {loading ? 'Getting Location...' : 'Get Location'}
        </Text>
      </TouchableOpacity>

      {location && (
        <View className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <Text className="text-green-800 text-base font-bold mb-2">
            📍 Your Location:
          </Text>
          <Text className="text-green-800 text-sm font-medium my-0.5">
            Latitude: {location.latitude.toFixed(6)}
          </Text>
          <Text className="text-green-800 text-sm font-medium my-0.5">
            Longitude: {location.longitude.toFixed(6)}
          </Text>
          <Text className="text-green-800 text-sm font-medium my-0.5">
            Accuracy: {location.accuracy.toFixed(6)}
          </Text>
          <Text className="text-green-800 text-sm font-medium my-0.5">
            Speed: {location.speed.toFixed(6)}
          </Text>
        </View>
      )}

      {address && (
        <View className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <Text className="text-blue-800 text-base font-bold mb-2">
            🏠 Address Details:
          </Text>
          {address.exactLocation ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              📍 Exact Location: {address.exactLocation}
            </Text>
          ) : null}
          {address.area ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              🏘️ Area: {address.area}
            </Text>
          ) : null}
          {address.city ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              🌆 City: {address.city}
            </Text>
          ) : null}
          {address.district ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              📍 District: {address.district}
            </Text>
          ) : null}
          {address.state ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              🗺️ State: {address.state}
            </Text>
          ) : null}
          {address.country ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              🌍 Country: {address.country}
            </Text>
          ) : null}
          {address.pincode ? (
            <Text className="text-blue-900 text-sm font-medium my-0.5">
              📮 Pincode: {address.pincode}
            </Text>
          ) : null}
          {address.fullAddress ? (
            <Text className="text-blue-800 text-xs font-normal mt-2 italic leading-[18px]">
              📌 Full Address: {address.fullAddress}
            </Text>
          ) : null}
        </View>
      )}

      {error && (
        <View className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
          <Text className="text-red-900 text-sm font-medium">
            ❌ {error}
          </Text>
        </View>
      )}
    </View>
  );
}

export default LocationButton;