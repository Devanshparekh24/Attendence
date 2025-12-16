import AttendanceModel from '../models/Attendance.model.js';

class AttendanceController {
    // GET /attendance
    static async getAll(req = {}) {
        try {
            const { user_id, date, date_from, date_to } = req.filters || {};
            const data = await AttendanceModel.findAll({ user_id, date, date_from, date_to });

            return {
                success: true,
                data: data.recordset || data,
                count: (data.recordset || data)?.length || 0,
                message: "Attendance records retrieved successfully"
            };
        } catch (error) {
            console.error("AttendanceController.getAll error:", error);
            return {
                success: false,
                error: error.message,
                data: [],
                message: "Failed to retrieve attendance records"
            };
        }
    }

    // GET /attendance/:id
    static async getById(req) {
        try {
            const { id } = req.params;

            if (!id) {
                return {
                    success: false,
                    error: "ID parameter is required",
                    data: null
                };
            }

            const data = await AttendanceModel.findById(id);

            if (data) {
                return {
                    success: true,
                    data: data,
                    found: true,
                    message: "Attendance record found"
                };
            } else {
                return {
                    success: false,
                    data: null,
                    found: false,
                    message: "Attendance record not found"
                };
            }
        } catch (error) {
            console.error("AttendanceController.getById error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve attendance record"
            };
        }
    }

    // GET /attendance/user/:userId
    static async getByUserId(req) {
        try {
            const { userId } = req.params;
            const { limit } = req.query || {};

            if (!userId) {
                return {
                    success: false,
                    error: "User ID parameter is required",
                    data: []
                };
            }

            const data = await AttendanceModel.findByUserId(userId, limit || 30);

            return {
                success: true,
                data: data.recordset || data,
                count: (data.recordset || data)?.length || 0,
                message: "User attendance records retrieved successfully"
            };
        } catch (error) {
            console.error("AttendanceController.getByUserId error:", error);
            return {
                success: false,
                error: error.message,
                data: [],
                message: "Failed to retrieve user attendance records"
            };
        }
    }


    // POST /attendance
    static async create(req) {
        try {
            const attendanceData = req.body;

            if (!attendanceData.emp_code || !attendanceData.android_id || !attendanceData.latitude_in || !attendanceData.longitude_in || !attendanceData.accuracy_in || !attendanceData.check_in) {
                return {
                    success: false,
                    error: "emp_code, android_id, latitude_in, longitude_in, accuracy_in, check_in are required",
                    message: "Validation failed "
                };
            }

            const result = await AttendanceModel.create(attendanceData);

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
                data: attendanceData
            };
        } catch (error) {
            console.error("AttendanceController.create error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to create attendance record"
            };
        }
    }

    // PUT /attendance/:id
    static async update(req) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!id) {
                return {
                    success: false,
                    error: "ID parameter is required"
                };
            }

            const result = await AttendanceModel.update(id, updateData);
            return {
                success: result.success,
                message: result.message
            };
        } catch (error) {
            console.error("AttendanceController.update error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to update attendance record"
            };
        }
    }

    // POST /attendance/checkout
    static async checkout(req) {
        try {
            const { emp_code, ...checkoutData } = req.body;

            if (!emp_code) {
                return {
                    success: false,
                    error: "emp_code is required",
                    message: "Validation failed"
                };
            }

            const result = await AttendanceModel.checkout(emp_code, checkoutData);
            return {
                success: result.success,
                message: result.message,
                error: result.error
            };
        } catch (error) {
            console.error("AttendanceController.checkout error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to process checkout"
            };
        }
    }

    static async getCheckInTime(req) {
        try {
            const { emp_code } = req.body || {};

            if (!emp_code) {
                return {
                    success: false,
                    error: "emp_code is required",
                    data: null,
                    message: "Validation failed"
                };
            }

            const result = await AttendanceModel.getEmployeeIn_Out({ emp_code });

            console.log("Controller received result:", JSON.stringify(result, null, 2));

            if (!result.success) {
                return {
                    success: false,
                    error: result.message,
                    data: null,
                    message: result.message || "Failed to retrieve attendance time"
                };
            }

            // Extract the actual data from the nested structure
            // result.result contains the stored procedure output
            const recordset = result.result?.recordset || result.result;
            const attendanceData = Array.isArray(recordset) ? recordset[0] : recordset;

            return {
                success: true,
                data: attendanceData,
                message: result.message || "Attendance Time retrieved successfully"
            };
        } catch (error) {
            console.error("AttendanceController.getCheckInTime error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve attendance time"
            };
        }
    }
}

export default AttendanceController;
