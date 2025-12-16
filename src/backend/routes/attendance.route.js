import AttendanceController from '../controllers/Attendance.controller.js';

// Attendance Routes
const attendanceRoutes = {
    // GET /attendance
    'GET /attendance': async (req = {}) => {
        return await AttendanceController.getAll(req);
    },

    // GET /attendance/:id
    'GET /attendance/:id': async (req = {}) => {
        return await AttendanceController.getById(req);
    },

    // GET /attendance/user/:userId
    'GET /attendance/user/:userId': async (req = {}) => {
        return await AttendanceController.getByUserId(req);
    },

    // GET /attendance/user/:userId/summary
    'GET /attendance/user/:userId/summary': async (req = {}) => {
        return await AttendanceController.getUserSummary(req);
    },

    // POST /attendance
    'POST /attendance': async (req = {}) => {
        return await AttendanceController.create(req);
    },

    // POST /attendance/checkout
    'POST /attendance/checkout': async (req = {}) => {
        return await AttendanceController.checkout(req);
    },
    // POST /attendance/checkinout
    'POST /attendance/checkinout': async (req = {}) => {
        return await AttendanceController.getCheckInTime(req);
    },

    // PUT /attendance/:id
    'PUT /attendance/:id': async (req = {}) => {
        return await AttendanceController.update(req);
    }
};

export default attendanceRoutes;
