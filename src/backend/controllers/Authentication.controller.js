import AuthenticationModel from "../models/Authentication.model.js";




class AuthenticationController {

    // POST /authentication
    static async createRegister(req) {
        try {
            const authenticationData = req.body;

            if (!authenticationData.emp_code) {
                return {
                    success: false,
                    error: "Emp_Code is required",
                    message: "Validation failed"
                };
            }

            const result = await AuthenticationModel.createRegister(authenticationData);

            if (!result.success) {
                // 🔴 Return failure to frontend
                return {
                    success: false,
                    message: result.message || "Registration failed",
                    error: result.error || null
                };
            }

            // 🟢 Success
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


    static async checkLogin(req) {
        try {
            const authenticationData = req.body;

            if (!authenticationData.emp_code || !authenticationData.emp_pass) {
                return {
                    success: false,
                    error: "Employee ID and employee Password are required",
                    message: "Validation failed"
                };
            }

            const result = await AuthenticationModel.checkLogin(authenticationData);

            if (!result.success) {
                return {
                    success: false,
                    message: result.message || "Login failed",
                    error: result.error || null
                };
            }

            return {
                success: true,
                message: result.message,
                data: authenticationData
            };
        } catch (error) {
            console.error("AuthenticationController.checkLogin error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to check login"
            };
        }
    }
}



export default AuthenticationController;