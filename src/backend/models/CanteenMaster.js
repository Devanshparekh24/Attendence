import dbConnection from '../dbConnection';

class CanteenMasterModel {
    // Get all canteen master records
    static async findAll() {
        const query = "SELECT * FROM Can_Canteen_Master";
        return await dbConnection.executeQuery(query);
    }

    // Get canteen master by ID
    static async findById(id) {
        const query = `SELECT * FROM Can_Canteen_Master WHERE CanteenId = ${id}`;
        const result = await dbConnection.executeQuery(query);
        const data = result.recordset || result;
        return data[0] || null;
    }

    // Get canteen master by specific criteria
    static async findByCriteria(criteria) {
        let query = "SELECT * FROM Can_Canteen_Master WHERE 1=1";

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
