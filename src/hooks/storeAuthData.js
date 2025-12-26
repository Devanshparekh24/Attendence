import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext.js';
import { use } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';



const useStoreAuthData = () => {

    const {  setEmployeeId, loginUser } = useAuth();
    const navigation = useNavigation();

    const storeAuthData = async () => {
        try {
    

            // 🔍 Read AsyncStorage ONCE
            const storedData = await AsyncStorage.getItem('userData');
            console.log('📦 AsyncStorage userData:', storedData);

            if (!storedData) {
                // 🔴 No stored user → Login
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
                return;
            }

            // 🟢 Safe parse
            const parsedData = JSON.parse(storedData);
            console.log('👤 Employee ID:', parsedData.emp_code);

            // 🟢 Update context
            setEmployeeId(parsedData.emp_code);

            const response = await loginUser(
                parsedData.emp_code,
                parsedData.emp_pass   // ⚠️ make sure key name is correct
            );

            if (response.success) {
                setEmployeeId(parsedData.emp_code);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                });
            } else {
                console.log('❌ Stored credentials invalid');

                Alert.alert(
                    'Login Failed',
                    response.message || 'Invalid credentials'
                );
                // optional: clear storage
                // await AsyncStorage.removeItem('userData');

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }


        } catch (error) {
            console.log('storeAuthData error:', error);

        }
    }
    return storeAuthData;

};
export default useStoreAuthData;

