import databaseConfig from '../database.js';
import dbConnection from '../dbConnection.js';


class EmployeeDetailsModel {


    static async getBasicDetails(BasicDetailsData) {
        try {
            const {
                Code
            } = BasicDetailsData;


            const empId = Code;
            const result = await dbConnection.executeProcedureWithResult("PRC_ATT_GET_EMP_BASIC_DET", {
                Code: empId,
            });
            console.log('get Employee Basic Detials', result);
            return {
                success: true,
                message: ` ${empId} Employee Basic Details retrieved successfully`,
                data: result
            }

        } catch (error) {
            console.error("SQL Error:", error);

            return {
                success: false,
                message: error.originalError?.message || error.message
            };
        }
    }

}


export default EmployeeDetailsModel;