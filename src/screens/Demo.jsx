// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { ApiService } from '../services';

const Demo = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Function called when button is pressed
  const fetchDataDirectly = async () => {
    setLoading(true);
    setData([]);
    setColumns([]);

    try {
      console.log("📡 Calling API: getCanteenMaster()...");
      const response = await ApiService.getCanteenMaster();

      console.log("📦 API Response:", response);

      if (response.success == true) {
        const finalData = response.data;

        console.log("📦 API Response finalData:", finalData);

        if (finalData && finalData.length > 0) {
          // Extract column names from the first row
          const columnNames = Object.keys(finalData[0]);
          setColumns(columnNames);
        }

        setData(finalData);
        console.log(`✅ Successfully fetched ${response.count} records`);
      } else {
        Alert.alert("API Error", response.error || "Failed to fetch data from API.");
      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      Alert.alert("Connection Error", error.message || "Failed to connect to database.");
    } finally {
      setLoading(false);
    }
  };

  // Render table header
  const renderTableHeader = () => {
    if (columns.length === 0) return null;
    return (
      <View className="flex-row bg-gray-700 py-3">
        {columns.map((col, index) => (
          <View key={index} className="w-[120px] px-2.5 justify-center">
            <Text className="text-white font-bold text-xs ">{col}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render each row
  const renderRow = ({ item, index }) => {
    const isEvenRow = index % 2 === 0;
    return (
      <View className={`flex-row py-2.5 border-b border-gray-200 ${isEvenRow ? 'bg-white' : 'bg-gray-50'}`}>
        {columns.map((col, colIndex) => (
          <View key={colIndex} className="w-[120px] px-2.5 justify-center">
            <Text className="text-xs text-gray-800" numberOfLines={2}>
              {item[col] !== null && item[col] !== undefined
                ? String(item[col])
                : '-'}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 pt-10 bg-gray-50">
      <Text className="text-2xl font-bold mb-5 text-center text-gray-800">
        📊 User Master Table
      </Text>

      <TouchableOpacity
        className={`bg-blue-500 py-3.5 px-6 rounded-lg items-center mb-5 shadow-md ${isLoading ? 'bg-blue-300' : ''}`}
        onPress={fetchDataDirectly}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text className="text-white text-base font-semibold">
          {isLoading ? 'Connecting...' : 'Fetch User Data'}
        </Text>
      </TouchableOpacity>

      {isLoading && (
        <View className="items-center my-7">
          <ActivityIndicator size="large" color="#4A90D9" />
          <Text className="mt-2.5 text-gray-500 text-sm">
            Fetching data from database...
          </Text>
        </View>
      )}

      {!isLoading && data.length > 0 && (
        <View className="flex-1 bg-white rounded-lg overflow-hidden shadow-sm">
          <Text className="p-3 bg-blue-50 text-blue-600 font-semibold text-sm">
            Found {data.length} record{data.length !== 1 ? 's' : ''}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View>
              {renderTableHeader()}
              <FlatList
                data={data}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                renderItem={renderRow}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </ScrollView>
        </View>
      )}

      {!isLoading && data.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-6xl mb-4">📭</Text>
          <Text className="text-lg font-semibold text-gray-500 mb-2">
            No data fetched yet
          </Text>
          <Text className="text-sm text-gray-400 text-center px-10">
            Press the button above to fetch User_Master data
          </Text>
        </View>
      )}
    </View>
  );
};

export default Demo;