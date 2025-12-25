import React from 'react';
import { Linking, BackHandler } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

const AppVersionUpdate = ({ visible, updateData, onDismiss }) => {
    if (!updateData) return null;

    const { mandatory, url, message, version_name, title } = updateData;

    const handleUpdate = () => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }
    };

    const handleDismiss = () => {
        if (mandatory) {
            // If mandatory, back button acts as exit or do nothing? 
            // Usually we want to force update, so maybe exit app or just don't dismiss.
            BackHandler.exitApp();
        } else {
            onDismiss();
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
