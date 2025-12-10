import dbConnection from '../dbConnection';

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
        const { employee_id, android_id, latitude_in, latitude_out, longitude_in, longitude_out, accuracy_in, accuracy_out, check_in, check_out } = attendanceData;

        // Helper to format date for SQL or return NULL
        const formatDate = (date) => {
            if (!date) return 'NULL';
            const d = new Date(date);
            // Adjust for local timezone offset
            const offsetMs = d.getTimezoneOffset() * 60 * 1000;
            const localDate = new Date(d.getTime() - offsetMs);
            return `'${localDate.toISOString().slice(0, 19).replace('T', ' ')}'`;
        };

        const checkInVal = formatDate(check_in);
        const checkOutVal = formatDate(check_out);

        // Ensure strings are quoted
        const androidIdVal = `'${android_id}'`;

        // Handle numeric fields that default to NULL or 0 based on schema
        const latIn = latitude_in !== undefined && latitude_in !== null ? latitude_in : 'NULL';
        // Schema says latitude_out is NOT NULL, so default to 0 if null
        const latOut = latitude_out !== undefined && latitude_out !== null ? latitude_out : 'NULL';
        const lonIn = longitude_in !== undefined && longitude_in !== null ? longitude_in : 'NULL';
        const lonOut = longitude_out !== undefined && longitude_out !== null ? longitude_out : 'NULL';
        const accIn = accuracy_in !== undefined && accuracy_in !== null ? accuracy_in : 'NULL';
        const accOut = accuracy_out !== undefined && accuracy_out !== null ? accuracy_out : 'NULL';


        const query = `
            INSERT INTO Att_EmpAttendance (employee_id, android_id, latitude_in, latitude_out, longitude_in, longitude_out, accuracy_in, accuracy_out, check_in, check_out)
            VALUES (${employee_id}, ${androidIdVal}, ${latIn}, ${latOut}, ${lonIn}, ${lonOut}, ${accIn}, ${accOut}, ${checkInVal}, ${checkOutVal})`;

        console.log("Executing Query:", query); // Debug log
        await dbConnection.executeUpdate(query);
        return {
            success: true,
            message: "Attendance record created successfully"
        };
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
    static async checkout(employeeId, checkoutData) {
        const { latitude_out, longitude_out, accuracy_out, check_out } = checkoutData;

        // Helper to format date for SQL
        const formatDate = (date) => {
            if (!date) return 'GETDATE()'; // Default to current server time if missing
            const d = new Date(date);
            const offsetMs = d.getTimezoneOffset() * 60 * 1000;
            const localDate = new Date(d.getTime() - offsetMs);
            return `'${localDate.toISOString().slice(0, 19).replace('T', ' ')}'`;
        };

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
                check_out = ${checkOutVal},
                updated_at = GETDATE()
            WHERE
                attendance_id = (
                    SELECT TOP 1 attendance_id
                    FROM Att_EmpAttendance
                    WHERE employee_id = ${employeeId}
                    AND check_out IS NULL
                    AND check_in >= CAST(GETDATE() AS DATE)
                AND check_in < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))
                    ORDER BY attendance_id DESC
                );
        `;

        console.log("Executing Checkout Query:", query);
        await dbConnection.executeUpdate(query);
        return { success: true, message: "Checkout successful" };
    }

    // Get attendance summary for user
    static async getUserSummary(userId, month, year) {
        const query = `
            SELECT
                COUNT(*) as total_days,
                SUM(CASE WHEN check_out_time IS NOT NULL THEN 1 ELSE 0 END) as present_days,
                SUM(CASE WHEN check_out_time IS NULL THEN 1 ELSE 0 END) as incomplete_records
            FROM Attendance
            WHERE user_id = ${userId}
            AND MONTH(date) = ${month}
            AND YEAR(date) = ${year}
        `;
        const result = await dbConnection.executeQuery(query);
        return result.recordset ? result.recordset[0] : result[0];
    }
}

export default AttendanceModel;
