import { View } from 'react-native';
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../../context/LocationContext';

const GoogleMap = () => {
    const { location } = useLocation();
    // Default location (India - center) if no location is provided
    const defaultRegion = {
        latitude: 20.5937,
        longitude: 78.9629,
        latitudeDelta: 10,
        longitudeDelta: 10,
    };

    // Use actual location if available
    const region = location
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
        : defaultRegion;

    return (
        <View className="w-full h-[50vh] rounded-xl overflow-hidden my-2.5 shadow-lg shadow-black/25">
            <MapView
                provider={PROVIDER_GOOGLE}
                className="w-full h-full"
                style={{ flex: 1 }}
                region={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                zoomEnabled={true}
                zoomControlEnabled={true}
                rotateEnabled={true}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Your Location"
                        description={`Lat: ${location.latitude.toFixed(6)}, Lng: ${location.longitude.toFixed(6)}`}
                        pinColor="red"
                    />
                )}
            </MapView>
        </View>
    );
};

export default GoogleMap;