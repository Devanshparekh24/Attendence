import AuthenticationModel from "../models/Authentication.model.js";
import EmployeeDetailsModel from "../models/EmployeeDetail.model.js";
import { sendSMS } from "../utils/smsService.js";


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


    static async verfiyUser(req) {
        try {
            const authenticationData = req.body;

            if (!authenticationData.emp_code) {
                return {
                    success: false,
                    error: "Emp_Code is required",
                    message: "Validation failed"
                };
            }

            const result = await AuthenticationModel.verfiyUser(authenticationData);

            if (!result.success) {
                return {
                    success: false,
                    message: result.message || "Verification failed",
                    error: result.error || null
                };
            }

            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("Generated OTP:", otp);

            // Extract mobile number from result
            // The result structure depends on the driver, it might be an array or an object with 'recordset'
            const dbResult = result.checkverifyUser;
            const rows = Array.isArray(dbResult) ? dbResult : (dbResult.recordset || []);
            const userData = rows.length > 0 ? rows[0] : null;

            const mobileNumber = userData?.MobileNo || userData?.Mobile || userData?.mobile || userData?.phone;

            if (mobileNumber) {
                // Send SMS
                await sendSMS(mobileNumber, otp);
            } else {
                console.warn("No mobile number found for user, cannot send SMS.");
            }

            return {
                success: true,
                message: result.message,
                data: {
                    ...authenticationData,
                    otp: otp,
                    mobile: mobileNumber
                }


            };
        } catch (error) {
            console.error("AuthenticationController.verfiyUser error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to verify user"
            };
        }
    }


    static async deRegisterDevice(req) {
        try {
            const authenticationData = req.body;

            if (!authenticationData.emp_code) {
                return {
                    success: false,
                    error: "Emp_Code is required",
                    message: "Validation failed"
                };
            }

            const result = await AuthenticationModel.deRegisterDevice(authenticationData);

            if (!result.success) {
                return {
                    success: false,
                    message: result.message || "Deregistration failed",
                    error: result.error || null
                };
            }

            return {
                success: true,
                message: result.message,
                data: {
                    ...authenticationData
                }
            };
        }
        catch (error) {
            console.error("AuthenticationController.deRegisterDevice error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to deregister device"
            };
        }
    }

    static async initiateDeregistration(req) {
        try {
            const { emp_code } = req.body;

            if (!emp_code) {
                return {
                    success: false,
                    error: "Emp_Code is required",
                    message: "Validation failed"
                };
            }

            // Get Employee Details to find mobile number
            const details = await EmployeeDetailsModel.getBasicDetails({ Code: emp_code });

            if (!details.success || !details.data) {
                return {
                    success: false,
                    message: "Employee details not found."
                };
            }

            const dbResult = details.data;
            const rows = Array.isArray(dbResult) ? dbResult : (dbResult.recordset || []);
            const userData = rows.length > 0 ? rows[0] : null;

            const mobileNumber = userData?.MobileNo || userData?.Mobile || userData?.mobile || userData?.phone;

            if (!mobileNumber) {
                return {
                    success: false,
                    message: "Mobile number not found for this employee."
                };
            }

            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("Generated Deregister OTP:", otp);

            // Send SMS
            await sendSMS(mobileNumber, otp);

            return {
                success: true,
                message: "OTP sent successfully",
                data: {
                    emp_code,
                    otp,
                    mobile: mobileNumber
                }
            };

        } catch (error) {
            console.error("AuthenticationController.initiateDeregistration error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to initiate deregistration"
            };
        }
    }
}

export default AuthenticationController;