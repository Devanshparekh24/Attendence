import { ScrollView } from 'react-native'
import React, { use, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PersonalInfo from '../components/Card/PersonalInfo';
import Employeeheader from '../components/Header/Employeeheader';
import useEmployeeBasicInfo from '../hooks/getEmployeeBasicInfo';
import AppVersionUpdate from '../components/Card/AppVersionUpdate';
// import Quickstates from '../components/Stats/Quickstates';

import { requestLocationPermission } from '../utils/requestLocationPermission';

const HomeScreen = () => {

    const employeeBasicInfo = useEmployeeBasicInfo();
    const employee = employeeBasicInfo?.[0];

    useEffect(() => {
        requestLocationPermission();
    }, []);

    requestLocationPermission();


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

            <AppVersionUpdate />
        </SafeAreaView>
    )

}

export default HomeScreen;