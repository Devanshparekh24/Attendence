import AuthenticationController from '../controllers/Authentication.controller.js';

// authentication Routes
const authenticationRoutes = {
    // GET /authentication
    'GET /authentication': async (req = {}) => {
        return await AuthenticationController.getAll(req);
    },

    // GET /authentication/:id
    'GET /authentication/:id': async (req = {}) => {
        return await AuthenticationController.getById(req);
    },

    // GET /authentication/user/:userId
    'GET /authentication/user/:userId': async (req = {}) => {
        return await AuthenticationController.getByUserId(req);
    },

    // GET /authentication/user/:userId/summary
    'GET /authentication/user/:userId/summary': async (req = {}) => {
        return await AuthenticationController.getUserSummary(req);
    },


    // POST /register (alias for /authentication)
    'POST /register': async (req = {}) => {
        return await AuthenticationController.createRegister(req);
    },

    // POST /login
    'POST /login': async (req = {}) => {
        return await AuthenticationController.checkLogin(req);
    },

    // PUT /authentication/:id
    'PUT /authentication/:id': async (req = {}) => {
        return await AuthenticationController.update(req);
    }
};

export default authenticationRoutes;
