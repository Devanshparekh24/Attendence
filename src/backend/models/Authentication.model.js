import dbConnection from '../dbConnection.js';
import { formatDate } from '../utils/formateDate.js';

class AuthenticationModel {
    static async createRegister(authenticationData) {
        try {
            const {
                emp_code,
                android_id,
                device_name,
                emp_pass,
                from_date,
                to_date
            } = authenticationData;

            const empId = emp_code || null;
            const androidIdVal = android_id || null;
            const emp_passVal = emp_pass;
            const deviceNameVal = device_name || null;
            const fromDateVal = from_date || null;
            const toDateVal = to_date || null;

            // IMPORTANT: Always use await
            const result = await dbConnection.executeProcedure(
                "PRC_ATT_REGISTER_INS",
                {
                    emp_code: empId,
                    android_id: androidIdVal,
                    device_name: deviceNameVal,
                    emp_pass: emp_passVal,
                    from_date: fromDateVal,
                    to_date: toDateVal
                }
            );

            return {
                success: true,
                message: "Attendance record created successfully",
                result
            };
        } catch (error) {
            console.error("SQL Error:", error);

            return {
                success: false,
                message: error.originalError?.message || error.message
            };
        }
    }

    static async checkLogin(authenticationData) {
        try {
            const {
                emp_code,
                emp_pass,
                android_id,
                device_name
            } = authenticationData;

            const empId = emp_code;
            const emp_passVal = emp_pass;
            const androidIdVal = android_id || null;
            const deviceNameVal = device_name || null;

            const loginData = await dbConnection.executeProcedure("PRC_ATT_LOGIN_CHK", {
                emp_code: empId,
                android_id: androidIdVal,
                device_name: deviceNameVal,
                emp_pass: emp_passVal
            });

            return {
                success: true,
                message: "Employee login successfully",
                loginData
            };
        } catch (error) {
            console.error("SQL Error:", error);

            return {
                success: false,
                message: error.originalError?.message || error.message
            };
        }



    }

    static async verfiyUser(authenticationData) {
        try {
            const { emp_code } = authenticationData;

            const empId = emp_code;

            const checkverifyUser = await dbConnection.executeProcedure("PRC_ATT_VERIFY_EMP", {
                    emp_code: empId
            });
            return {
                success: true,
                message: "EmployeeId verified successfully",
                checkverifyUser
            };

        } catch (error) {
            console.error("SQL Error:", error);

            return {
                success: false,
                message: error.originalError?.message || error.message
            };
        }
    }

}


export default AuthenticationModel;