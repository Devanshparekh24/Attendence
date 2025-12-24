import AppVersionController from '../controllers/Appversion.controller.js';

const appVersionRoutes = {



    'POST /app-version': async (req = {}) => {
        return await AppVersionController.getAppVersion(req);
    }// App Version Routes
}

export default appVersionRoutes;