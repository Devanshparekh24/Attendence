import { View, Text, ScrollView } from 'react-native'
import React, { use, useEffect, version } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import PersonalInfo from '../components/Card/PersonalInfo';
import Employeeheader from '../components/Header/Employeeheader';
import useEmployeeBasicInfo from '../hooks/getEmployeeBasicInfo';
import DeviceInfo from 'react-native-device-info';
import { ApiService } from '../backend';

// import Quickstates from '../components/Stats/Quickstates';


const HomeScreen = () => {

    const employeeBasicInfo = useEmployeeBasicInfo();
    const employee = employeeBasicInfo?.[0];

    const CURRENT_VERSION_CODE = Number(DeviceInfo.getBuildNumber());
    const CURRENT_VERSION_NAME = DeviceInfo.getVersion();
    console.log('Current Version Code:', CURRENT_VERSION_CODE);
    console.log('Current Version Name:', CURRENT_VERSION_NAME);

    const checkforUpdate = async () => {

        try {

            const response = await ApiService.getAppVersionDetails();

            console.log('App Version Details: ', response);


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        checkforUpdate();
    }, []);


    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <ScrollView>
                {/* Header Section */}
                <Employeeheader employee={employee} />

                {/* Overlapping White Card */}
                <PersonalInfo employee={employee} />

                {/* <TotalDays /> */}

                {/* <Quickstates /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen