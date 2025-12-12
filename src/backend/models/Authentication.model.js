import dbConnection from '../dbConnection.js';
import { formatDate } from '../utils/formateDate.js';

class AuthenticationModel {
    static async create(authenticationData) {
        const { Emp_Code, android_id, device_name, FromDate, ToDate } = authenticationData;


        const FromDateVal = formatDate(FromDate);
        const ToDateVal = formatDate(ToDate);

        // Ensure strings are quoted
        const androidIdVal = `'${android_id}'`;
        const deviceNameVal = `'${device_name}'`;
        
        const empId = Emp_Code !== undefined && Emp_Code !== null ? Emp_Code : 'NULL';
        

        const query = `
            Insert Into Att_Register (Emp_Code,Android_Id,Device_Name,FromDate,ToDate) 
            values
            (${empId},${androidIdVal},${deviceNameVal},${FromDateVal},${ToDateVal})`;

        console.log("Executing Query:", query); // Debug log
        await dbConnection.executeUpdate(query);
        return {
            success: true,
            message: "Attendance record created successfully"
        };
    }
}

export default AuthenticationModel;