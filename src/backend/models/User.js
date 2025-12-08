import dbConnection from '../dbConnection';

class UserModel {
    // Get all user records
    static async findAll() {
        const query = "SELECT * FROM User_Master";
        return await dbConnection.executeQuery(query);
    }

    // Get user by ID
    static async findById(id) {
        const query = `SELECT * FROM User_Master WHERE UserId = ${id}`;
        const result = await dbConnection.executeQuery(query);
        const data = result.recordset || result;
        return data[0] || null;
    }

    // Get user by criteria
    static async findByCriteria(criteria) {
        let query = "SELECT * FROM User_Master WHERE 1=1";

        if (criteria.name) {
            query += ` AND UserName LIKE '%${criteria.name}%'`;
        }
        if (criteria.active !== undefined) {
            query += ` AND is_active = ${criteria.active ? 1 : 0}`;
        }

        query += " ORDER BY UserId";
        return await dbConnection.executeQuery(query);
    }
}

export default UserModel;
