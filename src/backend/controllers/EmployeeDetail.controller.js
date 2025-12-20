import EmployeeDetailsModel from "../models/EmployeeDetail.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { ApiError } from "../utils/ApiError.js";


class EmployeeDetailController {

    static async getBasicDetails(req) {
        try {
            const { Code } = req.params;

            if (!Code) {
                return {
                    success: false,
                    error: "Employee code parameter is required",
                    data: null,
                    message: "Employee code parameter is missing"
                };
            }
            const data = await EmployeeDetailsModel.getBasicDetails({ Code });

            return {
                success: true,
                data: data.data,
                message: "Employee basic details retrieved successfully"
            };
        } catch (error) {
            console.error("EmployeeDetailController.getBasicDetails error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve employee basic details"
            };
        }
    }



}

export default EmployeeDetailController;