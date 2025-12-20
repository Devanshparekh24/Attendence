import { View, Text } from 'react-native';
import React from 'react';

const EmployeeHeader = ({ employee }) => {

    return (
        <View className="bg-primary-500 shadow-md p-6 rounded-b-3xl pb-24">

            <Text className="text-white text-2xl font-bold">
                Welcome Back ✌
            </Text>

            {employee ? (
                <View className="mt-4">
                    <Text className="text-white text-xl font-bold">
                        {employee.Name}
                    </Text>
                    <Text className="text-white text-sm font-semibold">
                        Employee ID: {employee.Code}
                    </Text>
                </View>
            ) : (
                <Text className="text-white/70 mt-4">
                    Loading...
                </Text>
            )}

        </View>
    );
};

export default EmployeeHeader;
