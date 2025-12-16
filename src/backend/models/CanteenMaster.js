import dbConnection from '../dbConnection';

class CanteenMasterModel {
    // Get all canteen master records
    static async findAll() {
        const query = "select emp_code AS Code,created_at as Date, check_in as CheckInTime , check_out as CheckOutTime from Att_EmpAttendance";
        return await dbConnection.executeQuery(query);
    }



    // Get canteen master by ID
    static async findById(id) {
        const query = `SELECT * FROM Att_EmpAttendance WHERE CanteenId = ${id}`;
        const result = await dbConnection.executeQuery(query);
        const data = result.recordset || result;
        return data[0] || null;
    }

    // Get canteen master by specific criteria
    static async findByCriteria(criteria) {
        let query = "SELECT * FROM Att_EmpAttendance WHERE 1=1";

        if (criteria.name) {
            query += ` AND name LIKE '%${criteria.name}%'`;
        }
        if (criteria.active !== undefined) {
            query += ` AND is_active = ${criteria.active ? 1 : 0}`;
        }

        query += " ORDER BY CanteenId";
        return await dbConnection.executeQuery(query);
    }
}

export default CanteenMasterModel;
