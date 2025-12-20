import { View, Text } from 'react-native'
import React from 'react'
import useEmployeeBasicInfo from '../../hooks/getEmployeeBasicInfo';



const Quickstates = () => {
    
    const employeeBasicInfo = useEmployeeBasicInfo();


    console.log('Working Days.........',employeeBasicInfo);
    

    return (
        <View>
            {/* Quick Stats Section */}
            <View className='px-6 mb-6'>
                <Text className='text-gray-800 text-lg font-bold mb-4'>Quick Stats</Text>
                <View className='flex-row gap-3'>
                    {/* Stat Card 1 */}
                    <View className='flex-1 bg-blue-50 rounded-xl p-4'>
                        <Text className='text-blue-600 text-2xl font-bold'>8.5</Text>
                        <Text className='text-gray-600 text-xs mt-1'>Avg Hours/Day</Text>
                    </View>

                    {/* Stat Card 2 */}
                    <View className='flex-1 bg-green-50 rounded-xl p-4'>
                        <Text className='text-green-600 text-2xl font-bold'>98%</Text>
                        <Text className='text-gray-600 text-xs mt-1'>Attendance</Text>
                    </View>

                    {/* Stat Card 3 */}
                    <View className='flex-1 bg-purple-50 rounded-xl p-4'>
                        <Text className='text-purple-600 text-2xl font-bold'>12</Text>
                        <Text className='text-gray-600 text-xs mt-1'>Days Off Left</Text>
                    </View>
                </View>
            </View>    </View>
    )
}

export default Quickstates