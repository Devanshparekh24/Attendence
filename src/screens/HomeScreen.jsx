import { ScrollView } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PersonalInfo from '../components/Card/PersonalInfo';
import Employeeheader from '../components/Header/Employeeheader';
import useEmployeeBasicInfo from '../hooks/getEmployeeBasicInfo';
import DeviceInfo from 'react-native-device-info';
import { ApiService } from '../backend';
import AppVersionUpdate from '../components/Card/AppVersionUpdate';

// import Quickstates from '../components/Stats/Quickstates';


const HomeScreen = () => {

    const employeeBasicInfo = useEmployeeBasicInfo();
    const employee = employeeBasicInfo?.[0];

    const [updateModalVisible, setUpdateModalVisible] = React.useState(false);
    const [updateData, setUpdateData] = React.useState(null);

    const CURRENT_VERSION_CODE = Number(DeviceInfo.getBuildNumber());
    const CURRENT_VERSION_NAME = DeviceInfo.getVersion();
    console.log('Current Version Code:', CURRENT_VERSION_CODE);
    console.log('Current Version Name:', CURRENT_VERSION_NAME);

    const checkforUpdate = useCallback(async () => {

        try {

            const response = await ApiService.getAppVersionDetails({
                versionCode: CURRENT_VERSION_CODE
            });

            console.log('App Version Details: ', response);

            if (response.success && response.data && response.data.length > 0) {
                const serverVersion = response.data[0];
                console.log('Server Version:', serverVersion);

                // Based on user data usually: id, version_code, version_name, update_url, message, timestamp, mandatory
                // We check variations of casing to be safe.
                const serverVersionCode = Number(serverVersion.version_code || serverVersion.Version_Code || 0);

                // LOG FOR DEBUGGING
                console.log(`Update Check: Server (${serverVersionCode}) > Local (${CURRENT_VERSION_CODE})`);

                // If backend returns data, comparing versions
                if (serverVersionCode > CURRENT_VERSION_CODE) {
                    console.log(`Update Check: Server (${serverVersionCode}) > Local (${CURRENT_VERSION_CODE}) -> SHOW MODAL`);

                    setUpdateData({
                        mandatory: true, // User requested 'exit' on cancel, implying mandatory.
                        url: serverVersion.apk_url || serverVersion.update_url || '',
                        message: serverVersion.release_notes || serverVersion.message || 'Please update your app',
                        version_name: serverVersion.version_name || '',
                        title: 'Update Available'
                    });
                    setUpdateModalVisible(true);
                } else {
                    console.log("App is up to date.");
                }
            }

        } catch (error) {
            console.log(error);

        }
    }, [CURRENT_VERSION_CODE]);

    useEffect(() => {
        checkforUpdate();
    }, [checkforUpdate]);


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

            <AppVersionUpdate
                visible={updateModalVisible}
                updateData={updateData}
                onDismiss={() => setUpdateModalVisible(false)}
            />
        </SafeAreaView>
    )

}

export default HomeScreen;