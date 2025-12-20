import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import useEmployeeBasicInfo from '../../hooks/getEmployeeBasicInfo';

const PersonalInfo = () => {

    const employeeBasicInfo = useEmployeeBasicInfo();


    return (
        <View>
            {/* Overlapping White Card */}

            <View>
                <View className='px-6 -mt-16 mb-6'>
                    <View className='bg-white rounded-2xl shadow-lg p-6'>
                        {/* Card Header */}
                        <View  className='mb-6 pb-4 border-b border-gray-200'>

                            <View className='flex-row gap-2'>
                                <Ionicons name="information-circle" size={24} color="#3b82f6" />
                                <Text className='text-gray-800 text-lg font-bold'>Basic Information</Text>
                            </View>
                        </View>

                        {/* Birth Date */}

                        {employeeBasicInfo.length > 0 ?
                            employeeBasicInfo?.map((info, index) => (


                                <View key={index} className='mb-5'>
                                    <View className='flex-row gap-2'>
                                        <Ionicons name="calendar" size={18} color="#3b82f6" />
                                        <Text className='text-gray-500 text-sm font-semibold mb-1'>Birth Date </Text>
                                    </View>
                                    <Text className='text-gray-800 text-lg font-bold'>

                                        {new Date(info.Birth_Date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        }

                                        )}

                                    </Text>
                                </View>
                            )) :
                            (
                                <Text className="text-gray-400">No employee data found</Text>

                            )}

                        {/* Designation */}

                        {employeeBasicInfo.length > 0 ?
                            employeeBasicInfo?.map((info, index) => (
                                <View key={index}

                                    className='mb-5'>
                                    <View className='flex-row gap-2'>
                                        <Ionicons name="briefcase" size={18} color="#3b82f6" />
                                        <Text className='text-gray-500 text-sm font-semibold mb-1'>Designation </Text>
                                    </View>

                                    <Text className='text-gray-800 text-lg font-bold'>
                                        {info.Designation}
                                    </Text>
                                </View>
                            ))
                            : (

                                <Text className="text-gray-400">No employee data found</Text>

                            )

                        }


                        {/* Join Date */}
                        {employeeBasicInfo.length > 0 ?
                            employeeBasicInfo?.map((info, index) => (

                                <View
                                    key={index}
                                    className='mb-5'>
                                    <View className='flex-row gap-2'>
                                        <Ionicons name="calendar" size={18} color="#3b82f6" />
                                        <Text className='text-gray-500 text-sm font-semibold mb-1'>Join Date</Text>
                                    </View>
                                    <Text className='text-gray-800 text-lg font-bold'>{new Date(info.Join_Date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</Text>
                                </View>

                            ))
                            : (
                                <Text className="text-gray-400">No employee data found</Text>
                            )

                        }


                        {/* Contact Numbe */}
                        {employeeBasicInfo.length > 0 ?

                            employeeBasicInfo.map((info, index) => (

                                <View key={index} className='mb-5'>

                                    <View className='flex-row gap-2'>
                                        <Ionicons name="call" size={18} color="#3b82f6" />
                                        <Text className='text-gray-500 text-sm font-semibold mb-1'>Contact Number</Text>
                                    </View>
                                    <Text className='text-gray-800 text-lg font-bold'>{info.mobile}</Text>
                                </View>

                            ))
                            : (<Text className="text-gray-400">No employee data found</Text>
                            )}


                    </View>
                </View>
            </View>

        </View>
    )
}

export default PersonalInfo