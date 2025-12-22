import { View, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../backend'


const VerifyButton = () => {
    const { employeeId,
        password,
        confirmPassword,

    } = useAuth();
    const navigation = useNavigation();




    const handleOtpScreen = () => {

        if (password === confirmPassword) {
            console.log("Navigating to OTP Screen");
            navigation.navigate('OtpScreen');

        } else {
            Alert.alert(
                "Password Mismatch",
                "Password and Confirm Password do not match"
            );
        }
    }
    const handleEmployeeidVerify = async () => {
        try {
            if (!employeeId) {
                Alert.alert("Missing Employee ID");
                return;
            }

            const response = await ApiService.verifyUser({ emp_code: employeeId });
            console.log("Verify User:", response);
            if (response.success) {
                console.log("Verify User Successful:", response.message);
                handleOtpScreen();
            } else {
                console.log("Verify User Failed:", response.message);
                Alert.alert("Verification Failed", response.message || "Failed to verify employee ID.");
            }
        } catch (error) {
            Alert.alert('error', error.message || 'Verification failed');
        }
    }

    return (
        <View>
            {/* Navigate to OTP Screen */}
            <TouchableOpacity
                onPress={handleEmployeeidVerify}
                className={` mt-3 bg-blue-600 py-4 rounded-lg items-center mb-4  'opacity-50' : ''
                        }`}
            >
                <Text className="text-white text-base font-bold">
                    Verify
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default VerifyButton;