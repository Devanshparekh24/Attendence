import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback, use } from 'react'
import { Button, Card, DataTable, Divider } from 'react-native-paper'
import { ApiService } from '../services';
import { useAuth } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';



const Demo = () => {

  const { employeeId } = useAuth();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useFocusEffect((
    useCallback(() => {
      try {

        console.log('Screen focused  refresh data');
        getEmployeeMontlyAttendance();

      } catch (error) {
        console.error('useFocusEffect error', error);
      }
    }, []

    )));



  const getEmployeeMontlyAttendance = useCallback(async () => {
    if (!employeeId) {
      setError('Employee ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.getMonthlyReport(employeeId);
      const data = Array.isArray(response.data) ? response.data : [];

      console.log("response", response);
      console.log('data', data);




      if (response?.success && Array.isArray(data)) {
        setAttendanceData(data);
      } else {
        setError(response?.error || 'Failed to fetch attendance data');
        setAttendanceData([]);
      }

    } catch (err) {
      console.error('getEmployeeMontlyAttendance error', err);
      setError(err?.message || 'An error occurred');
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  // Fetch data when component mounts
  useEffect(() => {
    if (employeeId) {
      getEmployeeMontlyAttendance();
    }
  }, [employeeId, getEmployeeMontlyAttendance]);



  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Card style={{ shadowColor: '#fff', backgroundColor: '#f9fafb' }}>
        <Card.Content className="py-5">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Monthly Attendance Report
          </Text>
          <Divider className="bg-blue-200" />
        </Card.Content>
      </Card>

      {/* Your existing logic below - Design only in wrapper */}
      <View className="mx-4 mb-4">
        {loading ? (
          <Card
            style={{
              shadowColor: '#fff',
              backgroundColor: '#f9fafb',
            }}
          >
            <Card.Content className="py-12 items-center justify-center">
              <ActivityIndicator size="large" color="#2563EB" />
              <Text className="mt-3 text-gray-600 text-center">Loading attendance data...</Text>
            </Card.Content>
          </Card>
        ) : error ? (
          <Card className="bg-red-50 border border-red-200 shadow-md">
            <Card.Content className="py-6 items-center justify-center">
              <Text className="text-red-500 text-center font-semibold">{error}</Text>
            </Card.Content>
          </Card>
        ) : (
          <Card className="shadow-md overflow-hidden">
            <DataTable theme={{ colors: { primary: '#2563EB' } }}>
              {/* Header */}
              <DataTable.Header style={{ backgroundColor: '#F3F4F6' }}>
                <DataTable.Title
                  style={{ flex: 1.5 }}
                  textStyle={{ fontWeight: '700', color: '#1F2937' }}
                >
                  Date
                </DataTable.Title>

                <DataTable.Title
                  style={{ flex: 1.5 }}
                  numeric
                  textStyle={{ fontWeight: '700', color: '#1F2937' }}
                >
                  Check In
                </DataTable.Title>

                <DataTable.Title
                  style={{ flex: 1.5 }}
                  numeric
                  textStyle={{ fontWeight: '700', color: '#1F2937' }}
                >
                  Check Out
                </DataTable.Title>
              </DataTable.Header>

              {/* Rows */}
              {attendanceData.length > 0 ? (
                attendanceData.map((record, index) => (
                  <View key={index}>
                    <DataTable.Row style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                      <DataTable.Cell style={{ flex: 1.5 }}>
                        <Text className="text-gray-900 font-semibold">
                          {record.Date ? new Date(record.Date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }) : '-'}
                        </Text>
                      </DataTable.Cell>

                      <DataTable.Cell style={{ flex: 1.5 }} numeric>
                        <View className="bg-green-100 px-2.5 py-1 rounded-lg">
                          <Text className="text-green-700 font-semibold text-xs">
                            {record.CheckInTime ? new Date(record.CheckInTime).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            }) : '-'}
                          </Text>
                        </View>
                      </DataTable.Cell>

                      <DataTable.Cell style={{ flex: 1.5 }} numeric>
                        <View className="bg-red-100 px-2.5 py-1 rounded-lg">
                          <Text className="text-red-700 font-semibold text-xs">
                            {record.CheckOutTime ? new Date(record.CheckOutTime).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            }) : '-'}
                          </Text>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                    {index < attendanceData.length - 1 && <Divider />}
                  </View>
                ))
              ) : (
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 4 }}>
                    <View className="py-10 items-center w-full">
                      <Text className="text-4xl mb-2">📋</Text>
                      <Text className="text-gray-500 text-center font-medium">
                        No attendance records found
                      </Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable>
          </Card>
        )}
      </View>


    </ScrollView>



  )
}

export default Demo;
