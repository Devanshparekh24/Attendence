import { View, Text } from 'react-native'
import React from 'react'
import useEmployeeBasicInfo from '../../hooks/getEmployeeBasicInfo';


const Employeeheader = () => {

    const employeeBasicInfo = useEmployeeBasicInfo();

    return (

        <View className="bg-primary-500 shadow-md p-6 rounded-b-3xl pb-24">
            <Text className="text-white text-2xl font-bold">
                Welcome Back ✌
            </Text>
            {employeeBasicInfo.length > 0 ?
                employeeBasicInfo?.map((info, index) => (
                    <View key={index} className='flex-col mt-4 justify-between '>
                        <Text className='text-white text-xl font-bold'>{info.Name}</Text>
                        <Text className='text-white text-sm font-semibold'>Employee ID: {info.Code}</Text>
                    </View>
                )) : (<Text className="text-gray-400">No employee data found</Text>)
            }
        </View>

    )
}

export default Employeeheader