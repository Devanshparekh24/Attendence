import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-bg items-center justify-center">
            <Text className="text-xl font-semibold text-textDark">
                Home Screen Content
            </Text>
        </SafeAreaView>
    );
};

export default HomeScreen;
