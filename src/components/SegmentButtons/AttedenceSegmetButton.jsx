import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SegmentedButtons } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import AttendanceScreen from '../../screens/AttendanceScreen';
import Demo from '../../screens/Demo';

const AttedenceSegmetButton = () => {
  const [value, setValue] = useState('');

  return (
    <View
      className=''
      style={styles.container}>
      <SegmentedButtons
       
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            checkedColor: 'white',
            icon: 'calendar-check',
            value: 'attendance',
            label: 'Attendance',
            onPress: () => <AttendanceScreen />,
          },
          {
            checkedColor: 'white',
            icon: 'location-enter',
            value: 'visit',
            label: 'Visit',
            onPress: () => <Demo />,
          },
        ]}
         theme={{
          colors: {
            secondaryContainer: '#2563eb', // selected bg
            onSecondaryContainer: '#ffffff', // selected text
            outline: '#2563eb',
          },
        }}
      />



    </View>



  )
}

export default AttedenceSegmetButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    color: 'white',


  },
  segment:{
    backgroundColor: '#10b981',
    color: 'white',
  }
});