import AuthenticationModel from "../models/Authentication.model.js";




class AuthenticationController {

    // POST /authentication
    static async create(req) {
        try {
            const authenticationData = req.body;

            if (!authenticationData.employee_id || !authenticationData.android_id || !authenticationData.latitude_in || !authenticationData.longitude_in || !authenticationData.accuracy_in || !authenticationData.check_in) {
                return {
                    success: false,
                    error: "employee_id, android_id, latitude_in, longitude_in, accuracy_in, check_in are required",
                    message: "Validation failed"
                };
            }

            const result = await AuthenticationModel.create(authenticationData);
            return {
                success: true,
                message: result.message,
                data: authenticationData
            };
        } catch (error) {
            console.error("AuthenticationController.create error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to create authentication record"
            };
        }
    }

}



export default AuthenticationController;