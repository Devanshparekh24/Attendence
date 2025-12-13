import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Button, Text, Avatar } from 'react-native-paper';
import { Switch } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Switch_IN_OUT = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <View className="flex-1 bg-gray-50 px-4 pt-2">
            {/* Header */}
            <View className="mb-6 mt-2">
                <Text variant="headlineMedium" className="font-semibold text-gray-900">
                    Attendance
                </Text>
            </View>

            {/* Status Card */}
            <Card className="mb-4">
                <Card.Content className="items-center py-6">
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
                </Card.Content>
            </Card>

            {/* Check In/Out Card */}
            <Card className="mb-6">
                <Card.Content className="flex-row items-center justify-around py-6">
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
                </Card.Content>
            </Card>

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
            <Card>
                <Card.Title
                    title="Today's History"
                    titleVariant="titleMedium"
                    left={(props) => (
                        <Ionicons name="time-outline" size={24} color="#666" />
                    )}
                />
                <Card.Content className="flex-row items-start py-4">
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
                </Card.Content>
            </Card>
        </View>
    )
}

export default Switch_IN_OUT