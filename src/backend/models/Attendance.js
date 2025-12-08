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
        const { user_id, check_in_time, check_out_time, date, location } = attendanceData;
        const query = `
            INSERT INTO Attendance (user_id, check_in_time, check_out_time, date, location, created_at)
            VALUES (${user_id}, '${check_in_time}', ${check_out_time ? `'${check_out_time}'` : 'NULL'}, '${date}', ${location ? `'${location}'` : 'NULL'}, GETDATE())
        `;
        await dbConnection.executeQuery(query);
        return { success: true, message: "Attendance record created successfully" };
    }

    // Update attendance (checkout)
    static async update(id, updateData) {
        const updates = [];
        if (updateData.check_out_time) updates.push(`check_out_time = '${updateData.check_out_time}'`);
        if (updateData.location) updates.push(`location = '${updateData.location}'`);

        if (updates.length === 0) return { success: false, message: "No fields to update" };

        const query = `UPDATE Attendance SET ${updates.join(', ')}, updated_at = GETDATE() WHERE id = ${id}`;
        await dbConnection.executeQuery(query);
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
