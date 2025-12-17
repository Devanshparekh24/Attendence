import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            console.log('🧹 userData cleared from AsyncStorage');
        } catch (error) {
            console.log('❌ Error clearing userData:', error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg items-center justify-center">
            <Text className="text-xl font-semibold text-textDark">
                Home Screen Content
            </Text>

            {/* <Button onPress={clearUserData}>Clear User Data</Button> */}
        </SafeAreaView>
    );
};

export default HomeScreen;
