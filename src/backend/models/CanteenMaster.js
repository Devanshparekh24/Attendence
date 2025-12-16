import dbConnection from '../dbConnection';

class CanteenMasterModel {
    // Get all canteen master records
    static async findAll() {
        const query = "select Code from [PAYROLL-1-2025-2026].dbo.emp_master";
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
