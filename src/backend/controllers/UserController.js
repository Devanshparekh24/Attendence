import UserModel from '../models/User.js';

class UserController {
    // GET /users
    static async getAll(req = {}) {
        try {
            const { active, role } = req.filters || {};
            const data = await UserModel.findAll({ active, role });

            return {
                success: true,
                data: data.recordset || data,
                count: (data.recordset || data)?.length || 0,
                message: "Users retrieved successfully"
            };
        } catch (error) {
            console.error("UserController.getAll error:", error);
            return {
                success: false,
                error: error.message,
                data: [],
                message: "Failed to retrieve users"
            };
        }
    }

    // GET /users/:id
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

            const data = await UserModel.findById(id);

            if (data) {
                return {
                    success: true,
                    data: data,
                    found: true,
                    message: "User found"
                };
            } else {
                return {
                    success: false,
                    data: null,
                    found: false,
                    message: "User not found"
                };
            }
        } catch (error) {
            console.error("UserController.getById error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve user"
            };
        }
    }

    // GET /users/email/:email
    static async getByEmail(req) {
        try {
            const { email } = req.params;

            if (!email) {
                return {
                    success: false,
                    error: "Email parameter is required",
                    data: null
                };
            }

            const data = await UserModel.findByEmail(email);

            if (data) {
                return {
                    success: true,
                    data: data,
                    found: true,
                    message: "User found"
                };
            } else {
                return {
                    success: false,
                    data: null,
                    found: false,
                    message: "User not found"
                };
            }
        } catch (error) {
            console.error("UserController.getByEmail error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve user"
            };
        }
    }

    // POST /users
    static async create(req) {
        try {
            const userData = req.body;

            if (!userData.name || !userData.email) {
                return {
                    success: false,
                    error: "Name and email are required",
                    message: "Validation failed"
                };
            }

            // Check if user already exists
            const existingUser = await UserModel.findByEmail(userData.email);
            if (existingUser) {
                return {
                    success: false,
                    error: "User with this email already exists",
                    message: "Duplicate user"
                };
            }

            const result = await UserModel.create(userData);
            return {
                success: true,
                message: result.message,
                data: userData
            };
        } catch (error) {
            console.error("UserController.create error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to create user"
            };
        }
    }

    // PUT /users/:id
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

            const result = await UserModel.update(id, updateData);
            return {
                success: result.success,
                message: result.message
            };
        } catch (error) {
            console.error("UserController.update error:", error);
            return {
                success: false,
                error: error.message,
                message: "Failed to update user"
            };
        }
    }
}

export default UserController;
