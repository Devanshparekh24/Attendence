import React, { useEffect, useState, useCallback } from 'react';
import { Linking, BackHandler } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { ApiService } from '../../backend';

const AppVersionUpdate = () => {
    const [visible, setVisible] = useState(false);
    const [updateData, setUpdateData] = useState(null);

    const CURRENT_VERSION_CODE = Number(DeviceInfo.getBuildNumber());

    const checkforUpdate = useCallback(async () => {
        try {
            console.log('Checking for updates...', CURRENT_VERSION_CODE);
            const response = await ApiService.getAppVersionDetails({
                versionCode: CURRENT_VERSION_CODE
            });

            if (response.success && response.data && response.data.length > 0) {
                const serverVersion = response.data[0];
                const serverVersionCode = Number(serverVersion.version_code || serverVersion.Version_Code || 0);

                console.log(`Update Check: Server (${serverVersionCode}) > Local (${CURRENT_VERSION_CODE})`);

                if (serverVersionCode > CURRENT_VERSION_CODE) {
                    setUpdateData({
                        mandatory: true,
                        url: serverVersion.apk_url || serverVersion.update_url || '',
                        message: serverVersion.release_notes || serverVersion.message || 'Please update your app',
                        version_name: serverVersion.version_name || '',
                        title: 'Update Available'
                    });
                    setVisible(true);
                }
            }
        } catch (error) {
            console.log("Update check failed:", error);
        }
    }, [CURRENT_VERSION_CODE]);

    useEffect(() => {
        checkforUpdate();
    }, [checkforUpdate]);

    if (!visible || !updateData) return null;

    const { mandatory, url, message, version_name, title } = updateData;

    const handleUpdate = () => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }
    };

    const handleDismiss = () => {
        if (mandatory) {
            BackHandler.exitApp();
        } else {
            setVisible(false);
        }
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={mandatory ? () => { } : handleDismiss} dismissable={!mandatory}>
                <Dialog.Title>{title || "Update Available"}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">
                        {message || `A new version ${version_name ? `(${version_name})` : ''} is available. Please update to continue using the app.`}
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleDismiss}>
                        {mandatory ? "Exit" : "Later"}
                    </Button>
                    <Button onPress={handleUpdate} mode="contained" className="ml-2">
                        Update
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AppVersionUpdate;
