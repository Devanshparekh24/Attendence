import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PersonalInfo = ({ employee }) => {

    if (!employee) {
        return (
            <View className="px-6 mt-6">
                <Text className="text-gray-400 text-center">
                    Loading...
                </Text>
            </View>
        );
    }

    return (
        <View className="px-6 -mt-16 mb-6">
            <View className="bg-white rounded-2xl shadow-lg p-6">
                <View className='mb-6 pb-4 border-b border-gray-200'>

                    <View className='flex-row gap-2'>
                        <Ionicons name="information-circle" size={24} color="#3b82f6" />
                        <Text className='text-gray-800 text-lg font-bold'>Basic Information</Text>
                    </View>
                </View>
                {/* Birth Date */}
                <View className="mb-5">
                    <View className="flex-row gap-2">
                        <Ionicons name="calendar" size={18} color="#3b82f6" />
                        <Text className="text-gray-500 text-sm font-semibold">
                            Birth Date
                        </Text>
                    </View>
                    <Text className="text-gray-800 text-lg font-semibold">
                        {new Date(employee.Birth_Date).toLocaleDateString('en-GB')}
                    </Text>
                </View>

                {/* Designation */}
                <View className="mb-5">
                    <View className="flex-row gap-2">
                        <Ionicons name="briefcase" size={18} color="#3b82f6" />
                        <Text className="text-gray-500 text-sm font-semibold">
                            Designation
                        </Text>
                    </View>
                    <Text className="text-gray-800 text-lg font-semibold">
                        {employee.Designation}
                    </Text>
                </View>

                {/* Join Date */}
                <View className="mb-5">
                    <View className="flex-row gap-2">
                        <Ionicons name="calendar" size={18} color="#3b82f6" />
                        <Text className="text-gray-500 text-sm font-semibold">
                            Join Date
                        </Text>
                    </View>
                    <Text className="text-gray-800 text-lg font-semibold">
                        {new Date(employee.Join_Date).toLocaleDateString('en-GB')}
                    </Text>
                </View>

                {/* Contact Number */}
                <View className="mb-5">
                    <View className="flex-row gap-2">
                        <Ionicons name="call" size={18} color="#3b82f6" />
                        <Text className="text-gray-500 text-sm font-semibold">
                            Contact Number
                        </Text>
                    </View>
                    <Text className="text-gray-800 text-lg font-semibold">
                        {employee.mobile}
                    </Text>
                </View>

            </View>
        </View>
    );
};

export default PersonalInfo;
