import AttendanceModel from '../models/Attendance.js';

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

            if (!attendanceData.user_id || !attendanceData.check_in_time || !attendanceData.date) {
                return {
                    success: false,
                    error: "User ID, check-in time, and date are required",
                    message: "Validation failed"
                };
            }

            const result = await AttendanceModel.create(attendanceData);
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

    // GET /attendance/user/:userId/summary
    static async getUserSummary(req) {
        try {
            const { userId } = req.params;
            const { month, year } = req.query || {};

            if (!userId || !month || !year) {
                return {
                    success: false,
                    error: "User ID, month, and year parameters are required",
                    data: null
                };
            }

            const data = await AttendanceModel.getUserSummary(userId, month, year);

            return {
                success: true,
                data: data,
                message: "Attendance summary retrieved successfully"
            };
        } catch (error) {
            console.error("AttendanceController.getUserSummary error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve attendance summary"
            };
        }
    }
}

export default AttendanceController;
