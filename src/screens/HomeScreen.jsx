import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import PersonalInfo from '../components/Card/PersonalInfo';
import Employeeheader from '../components/Header/Employeeheader';
import useEmployeeBasicInfo from '../hooks/getEmployeeBasicInfo';
import Quickstates from '../components/Stats/Quickstates';


const HomeScreen = () => {

    const employeeBasicInfo = useEmployeeBasicInfo();
    const employee = employeeBasicInfo?.[0];

    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <ScrollView>
                {/* Header Section */}
                <Employeeheader employee={employee} />

                {/* Overlapping White Card */}
                <PersonalInfo employee={employee} />

                {/* <TotalDays /> */}

                <Quickstates />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen