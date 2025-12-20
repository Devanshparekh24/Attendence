import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Card, DataTable, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { ApiService } from '../services';
import { useAuth } from '../context/AuthContext';

const Demo = () => {
  const { employeeId } = useAuth();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEmployeeMontlyAttendance = useCallback(async () => {
    if (!employeeId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getMonthlyReport(employeeId);
      setAttendanceData(Array.isArray(response?.data) ? response.data : []);
    } catch {
      setError('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useFocusEffect(
    useCallback(() => {
      getEmployeeMontlyAttendance();
    }, [getEmployeeMontlyAttendance])
  );

  return (
    <ScrollView className="flex-1 bg-blue-50">
      <View className="mx-4 my-4">
        <Card className="rounded-xl overflow-hidden bg-white">
          <Card.Content
          className='bg-primary-500'
          // style={{backgroundColor: '#DBEAFE'}}
          >
            <Text className="text-xl text-center font-bold text-white mb-2">
              Monthly Attendance Report
            </Text>
            <Divider className="bg-blue-200" />
          </Card.Content>

          {loading ? (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          ) : error ? (
            <View className="py-10 items-center">
              <Text className="text-red-600 font-semibold">{error}</Text>
            </View>
          ) : (
            <DataTable>
              {/* HEADER */}
              <DataTable.Header style={styles.header}>
                <HeaderCell title="Emp ID" flex={1.5} />
                <HeaderCell title="Date" flex={1.5} />
                <HeaderCell title="Check In" flex={1} center />
                <HeaderCell title="Check Out" flex={1} center />
              </DataTable.Header>

              {/* ROWS */}
              {attendanceData.length > 0 ? (
                attendanceData.map((item, index) => (
                  <DataTable.Row
                    key={index}
                    style={[
                      styles.row,
                      {
                        backgroundColor:
                          index % 2 === 0 ? '#FFFFFF' : '#F1F5F9',
                      },
                    ]}
                  >
                    <BodyCell value={item.Code || '-'} flex={1.5} />

                    <BodyCell
                      flex={1.5}
                      value={
                        item.Date
                          ? new Date(item.Date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: '2-digit',
                            })
                          : '-'
                      }
                    />

                    <TimeCell
                      value={item.CheckInTime}
                      bg="bg-green-200"
                      text="text-green-800"
                    />

                    <TimeCell
                      value={item.CheckOutTime}
                      bg="bg-red-200"
                      text="text-red-800"
                    />
                  </DataTable.Row>
                ))
              ) : (
                <View className="py-12 items-center">
                  <Text className="text-blue-600 font-medium">
                    No attendance records
                  </Text>
                </View>
              )}
            </DataTable>
          )}
        </Card>
      </View>
    </ScrollView>
  );
};

/* ---------- COMPONENTS ---------- */

const HeaderCell = ({ title, flex, center }) => (
  <DataTable.Title
    style={{ flex, justifyContent: 'center' }}
    textStyle={{
      fontWeight: '700',
      fontSize: 12,
      color: '#1E3A8A',
      textAlign: center ? 'center' : 'left',
    }}
  >
    {title}
  </DataTable.Title>
);

const BodyCell = ({ value, flex }) => (
  <DataTable.Cell style={{ flex, justifyContent: 'center' }}>
    <Text className="text-xs font-semibold text-slate-700">
      {value}
    </Text>
  </DataTable.Cell>
);

const TimeCell = ({ value, bg, text }) => (
  <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>
    <View className={`${bg} px-2 py-1 rounded-md min-w-[70px]`}>
      <Text className={`${text} text-xs font-semibold text-center`}>
        {value
          ? new Date(value).toLocaleTimeString('en-IN', {
              day : '2-digit', month : '2-digit', year : '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : '-'}
      </Text>
    </View>
  </DataTable.Cell>
);

/* ---------- STYLES ---------- */
const styles = {
  header: {
    backgroundColor: '#DBEAFE', // light blue
    minHeight: 52,
  },
  row: {
    minHeight: 56,
    paddingVertical: 6,
  },
};

export default Demo;
