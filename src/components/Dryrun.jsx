import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavigationTab = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabPress = (tabName) => {
        setActiveTab(tabName);
        if (onTabChange) {
            onTabChange(tabName);
        }
    };

    const TabButton = ({ name, icon, label }) => {
        const isActive = activeTab === name;

        return (
            <TouchableOpacity
                className="flex-1 items-center justify-center py-1"
                onPress={() => handleTabPress(name)}
                activeOpacity={0.7}
            >
                <View className="mb-0.5">
                    <Ionicons
                        name={isActive ? icon : `${icon}-outline`}
                        size={28}
                        color={isActive ? '#000' : '#8e8e8e'}
                    />
                </View>
                <Text className={`text-[11px] mt-0.5 ${isActive
                    ? 'text-black font-semibold'
                    : 'text-gray-500 font-medium'
                    }`}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View className=" bg-white border-t border-gray-300">
            <View className="h-[0.5px] bg-gray-400" />
            <View className="flex-row justify-around items-center py-2 pb-3 bg-white">
                <TabButton name="home" icon="home" label="Home" />
                <TabButton name="attendance" icon="calendar" label="Attendance" />
                <TabButton name="visit" icon="location" label="Visit" />
                <TabButton name="settings" icon="settings" label="Settings" />
            </View>
        </View>
    );
};

export default NavigationTab;