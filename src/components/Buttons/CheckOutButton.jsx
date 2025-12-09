import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CheckOutButton = () => {

    const handleCheckOut = () => {
        console.log('Check Out start here');
    }
    return (
        <View>
            <TouchableOpacity onPress={handleCheckOut} className='bg-primary-500 py-3 px-8 rounded-lg w-full items-center mb-2.5'>
                <Text className='text-primary-50 text-base font-semibold'> Check Out</Text>
            </TouchableOpacity>    </View>
    )
}

export default CheckOutButton;

