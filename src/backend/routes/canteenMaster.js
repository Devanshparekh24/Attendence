import CanteenMasterController from '../controllers/CanteenMasterController.js';

// Canteen Master Routes
const canteenMasterRoutes = {
    // GET /canteen-master
    'GET /canteen-master': async (req = {}) => {
        return await CanteenMasterController.getAll(req);
    },

    // GET /canteen-master/:id
    'GET /canteen-master/:id': async (req = {}) => {
        return await CanteenMasterController.getById(req);
    },

    // GET /canteen-master/search
    'GET /canteen-master/search': async (req = {}) => {
        return await CanteenMasterController.search(req);
    }
};

export default canteenMasterRoutes;
