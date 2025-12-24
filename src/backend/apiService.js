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
        try {
            const response = await router.handle('POST', '/attendance', {
                body: attendanceData
            });
            return response;

        } catch (error) {

        }

    }

    static async createRegister(registerData) {
        const response = await router.handle('POST', '/register', {
            body: registerData
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

    static async checkLogin(authenticationData) {
        try {
            const response = await router.handle('POST', '/login', {
                body: {
                    emp_code: authenticationData.employeeId,
                    emp_pass: authenticationData.password,
                    android_id: authenticationData.androidId,
                    device_name: authenticationData.deviceName
                }
            });
            return response;

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.message || "Login request failed"
            };
        }
    }

    static async verifyUser(authenticationData) {
        try {
            const response = await router.handle('POST', '/authentication/verify', {
                body: authenticationData
            });
            return response;

        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.message || "Verification request failed"
            };
        }
    }

    // POST /attendance/checkinout
    static async getCheckInOut(emp_code) {
        const response = await router.handle('POST', '/attendance/checkinout', {
            body: { emp_code }
        });
        return response;
    }
    //GET /attendance/monthly-report

    static async getMonthlyReport(emp_code) {
        const response = await router.handle('GET', '/attendance/monthly-report', {
            query: { emp_code }
        });
        return response;
    }



    //GET /basic-details/:emp_code
    static async getEmployeeBasicDetails(Code) {
        const response = await router.handle('GET', '/basic-details/emp_code', {
            params: { Code }
        }

        );
        return response;
    }

    // PUT /authentication/deregister

    static async deRegisterDevice(authenticationData) {
        try {
            const response = await router.handle('PUT', '/authentication/deregister', {
                body: authenticationData
            });
            return response;
        } catch (error) {
            console.log(error)
        }

    }

    static async initiateDeregistration(authenticationData) {
        try {
            const response = await router.handle('POST', '/authentication/initiate-deregister', {
                body: authenticationData
            });
            return response;
        } catch (error) {
            console.log(error)
             return {
                success: false,
                message: error.message || "Request failed"
            };
        }
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
