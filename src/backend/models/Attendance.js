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
        const { employee_id, latitude, longitude, accuracy, android_id, check_in, check_out } = attendanceData;

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
        const longitudeVal = `'${longitude}'`;

        const query = `
            INSERT INTO Att_EmpAttendance (employee_id, latitude, longitude, accuracy, android_id, check_in, check_out)
            VALUES (${employee_id}, ${latitude}, ${longitudeVal}, ${accuracy}, ${androidIdVal}, ${checkInVal}, ${checkOutVal})`;

        console.log("Executing Query:", query); // Debug log
        await dbConnection.executeUpdate(query);
        return { success: true, message: "Attendance record created successfully" };
    }

    // Update attendance (checkout)
    static async update(id, updateData) {
        const updates = [];
        if (updateData.check_out_time) updates.push(`check_out_time = '${updateData.check_out_time}'`);
        if (updateData.location) updates.push(`location = '${updateData.location}'`);

        if (updates.length === 0) return { success: false, message: "No fields to update" };

        const query = `UPDATE Attendance SET ${updates.join(', ')}, updated_at = GETDATE() WHERE id = ${id}`;
        await dbConnection.executeUpdate(query);
        return { success: true, message: "Attendance record updated successfully" };
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
