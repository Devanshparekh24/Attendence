import router from './routes';

// Simple API service that uses the MVC router
class ApiService {
    // GET /canteen-master
    static async getCanteenMaster() {
        const response = await router.handle('GET', '/canteen-master');
        return response;
    }

    // GET /users
    static async getUsers(filters = {}) {
        const response = await router.handle('GET', '/users', { filters });
        return response;
    }

    // GET /user/:id
    static async getUserById(id) {
        const response = await router.handle('GET', `/users/${id}`);
        return response;
    }

    // POST /attendance
    static async createAttendance(attendanceData) {
        const response = await router.handle('POST', '/attendance', {
            body: attendanceData
        });
        return response;
    }

    // POST /attendance/checkout
    static async checkout(checkoutData) {
        const response = await router.handle('POST', '/attendance/checkout', {
            body: checkoutData
        });
        return response;
    }

    // Raw query executor (for custom queries)
    static async raw(query) {
        // For raw queries, we still need direct database access
        const { dbConnection } = await import('./dbConnection.js');
        try {
            const result = await dbConnection.executeQuery(query);
            return {
                success: true,
                data: result.recordset || result
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

export default ApiService;
