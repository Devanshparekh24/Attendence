import dbConnection from '../dbConnection.js';
import { formatDate } from '../utils/formateDate.js';
class AttendanceModel {
    // Get all attendance records
    static async findAll(filters = {}) {
        let query = "SELECT * FROM Attendance WHERE 1=1";

        if (filters.user_id) {
            query += ` AND user_id = ${filters.user_id}`;
        }
        if (filters.date) {
            query += ` AND date = '${filters.date}'`;
        }
        if (filters.date_from && filters.date_to) {
            query += ` AND date BETWEEN '${filters.date_from}' AND '${filters.date_to}'`;
        }

        query += " ORDER BY date DESC, check_in_time DESC";
        return await dbConnection.executeQuery(query);
    }

    // Get attendance by ID
    static async findById(id) {
        const query = `SELECT * FROM Attendance WHERE id = ${id}`;
        const result = await dbConnection.executeQuery(query);
        const data = result.recordset || result;
        return data[0] || null;
    }

    // Get attendance for specific user
    static async findByUserId(userId, limit = 30) {
        const query = `
            SELECT TOP ${limit} * FROM Attendance
            WHERE user_id = ${userId}
            ORDER BY date DESC, check_in_time DESC
        `;
        return await dbConnection.executeQuery(query);
    }

    // Create new attendance record
    static async create(attendanceData) {
        try {

            const {
                emp_code,
                android_id,
                latitude_in,
                latitude_out,
                longitude_in,
                longitude_out,
                accuracy_in,
                accuracy_out,
                check_in,
                check_out
            } = attendanceData;


            const checkInVal = formatDate(check_in);
            const checkOutVal = formatDate(check_out);

            // Ensure strings are quoted
            const androidIdVal = android_id;
            const empId = emp_code;
            // Handle numeric fields that default to NULL or 0 based on schema
            const latIn = latitude_in !== undefined && latitude_in !== null ? latitude_in : null;
            const latOut = latitude_out !== undefined && latitude_out !== null ? latitude_out : null;
            const lonIn = longitude_in !== undefined && longitude_in !== null ? longitude_in : null;
            const lonOut = longitude_out !== undefined && longitude_out !== null ? longitude_out : null;
            const accIn = accuracy_in !== undefined && accuracy_in !== null ? accuracy_in : null;
            const accOut = accuracy_out !== undefined && accuracy_out !== null ? accuracy_out : null;
            const isVisit = attendanceData.Is_Visit !== undefined && attendanceData.Is_Visit !== null ? attendanceData.Is_Visit : 0;
            const result = await dbConnection.executeProcedure("PRC_ATT_CHECKIN_INS", {
                emp_code: empId,
                android_id: androidIdVal,
                latitude_in: latIn,
                latitude_out: latOut,
                longitude_in: lonIn,
                longitude_out: lonOut,
                accuracy_in: accIn,
                accuracy_out: accOut,
                check_in: checkInVal,
                check_out: checkOutVal,
                Is_Visit: isVisit,

            });

            console.log("Executing Query:", result); // Debug log

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

    // Generic Update (Admin/Manual edit)
    static async update(id, updateData) {
        const updates = [];
        if (updateData.check_out_time) updates.push(`check_out_time = '${updateData.check_out_time}'`);
        if (updateData.location) updates.push(`location = '${updateData.location}'`);
        // Add other fields as necessary

        if (updates.length === 0) return { success: false, message: "No fields to update" };

        const query = `UPDATE Att_EmpAttendance SET ${updates.join(', ')}, updated_at = GETDATE() WHERE attendance_id = ${id}`;
        await dbConnection.executeUpdate(query);
        return { success: true, message: "Attendance record updated successfully" };
    }

    // Check-out logic: Updates the latest open record for the employee
    static async checkout(emp_code, checkoutData) {
        const {
            latitude_out,
            longitude_out,
            accuracy_out,
            check_out
        } = checkoutData;

        const empId = emp_code;

        const checkOutVal = formatDate(check_out);
        const latOut = latitude_out !== undefined ? latitude_out : 'NULL';
        const lonOut = longitude_out !== undefined ? longitude_out : 'NULL';
        const accOut = accuracy_out !== undefined ? accuracy_out : 'NULL';

        const query = `
            UPDATE Att_EmpAttendance
            SET
                latitude_out = ${latOut},
                longitude_out = ${lonOut},
                accuracy_out = ${accOut},
                check_out = ${checkOutVal ? `'${checkOutVal}'` : 'NULL'},
                updated_at = GETDATE()
            WHERE
                attendance_id = (
                    SELECT TOP 1 attendance_id
                    FROM Att_EmpAttendance
                    WHERE emp_code = ${empId}
                    AND check_out IS NULL
                    AND check_in >= CAST(GETDATE() AS DATE)
                AND check_in < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))
                    ORDER BY attendance_id DESC
                );
        `;

        console.log("Executing Checkout Query:", query);
        const result = await dbConnection.executeUpdate(query);
        console.log("Checkout Update Result:", result);

        if (result > 0) {
            return { success: true, message: "Checkout successful" };
        } else {
            return {
                success: false,
                message: "Please Check In first before checking out",
                error: "No open attendance record found for today"
            };
        }
    }

    // Get attendance summary for user
    static async getEmployeeIn_Out(attendanceData) {
        try {
            const {
                emp_code
            } = attendanceData;

            const empId = emp_code;

            const result = await dbConnection.executeProcedureWithResult("PRC_ATT_GET_DAILY_ATTENDANCE_TIME", {
                emp_code: empId,
            });


            console.log("Executing Query:", result); // Debug log

            return {
                success: true,
                message: "Attendance record retrieved successfully",
                result
            }
        } catch (error) {
            console.error("SQL Error:", error);

            return {
                success: false,
                message: error.originalError?.message || error.message
            }

        }



    }
}

export default AttendanceModel;
