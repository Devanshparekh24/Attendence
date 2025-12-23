import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const SettingsScreen = () => {

    const navigation = useNavigation();

    const handleDeRegister = () => {
        navigation.navigate('DeRegister');

    }
    return (
        <View>
            <View>

                <TouchableOpacity onPress={handleDeRegister} className="px-4 py-3">
                    <Text className="text-lg font-semibold">De-Register</Text>
                </TouchableOpacity>

                <Divider />
                <Divider />
            </View>
        </View>
    )
}

export default SettingsScreen
