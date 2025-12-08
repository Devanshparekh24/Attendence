import UserController from '../controllers/UserController.js';

// User Routes
const userRoutes = {
    // GET /users
    'GET /users': async (req = {}) => {
        return await UserController.getAll(req);
    },

    // GET /users/:id
    'GET /users/:id': async (req = {}) => {
        return await UserController.getById(req);
    },

    // GET /users/email/:email
    'GET /users/email/:email': async (req = {}) => {
        return await UserController.getByEmail(req);
    },

    // POST /users
    'POST /users': async (req = {}) => {
        return await UserController.create(req);
    },

    // PUT /users/:id
    'PUT /users/:id': async (req = {}) => {
        return await UserController.update(req);
    }
};

export default userRoutes;
