import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext.js';



const useStoreAuthData = () => {

    const { employeeId, password, confirmPassword } = useAuth();

    const storeAuthData = async () => {
        try {
            const userData = {
                emp_code: employeeId,
                emp_pass: password || confirmPassword,
            };

            // STORE

            await AsyncStorage.setItem("userData", JSON.stringify(userData));

            console.log("✅ Stored in AsyncStorage");

            // READ BACK
            const storedData = await AsyncStorage.getItem("userData");
            console.log("📦 AsyncStorage userData (raw):", storedData);

            const parsedData = JSON.parse(storedData);
            console.log("👤 Employee ID from storage:", parsedData.emp_code);
            console.log("🔐 Confirm Password from storage:", parsedData.emp_pass)


        } catch (error) {
            console.log('storeAuthData error:', error);

        }
    }
    return storeAuthData;

};
export default useStoreAuthData;

