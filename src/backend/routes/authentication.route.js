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

    // // POST /login
    'POST /login': async (req = {}) => {
        return await AuthenticationController.checkLogin(req);
    },
    'POST /authentication': async (req = {}) => {
        return await AuthenticationController.createRegister(req);
    },
    'POST /authentication/verify': async (req = {}) => {
        return await AuthenticationController.verfiyUser(req);
    },

    // PUT /authentication/deregister
    'PUT /authentication/deregister': async (req = {}) => {
        return await AuthenticationController.deRegisterDevice(req);
    },

    // POST /authentication/initiate-deregister
    'POST /authentication/initiate-deregister': async (req = {}) => {
        return await AuthenticationController.initiateDeregistration(req);
    }


};

export default authenticationRoutes;
