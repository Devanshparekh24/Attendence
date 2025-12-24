import AppVersionModel from '../models/AppVersion.model.js';

class AppVersionController {
    static async getAppVersion(req, res) {
        try {
            const versionData = req.body;

            const result = await AppVersionModel.getAppVersion(versionData);
            if (!versionData.version_code) {
                return {
                    success: false,
                    error: "Version code is required",
                    message: "Validation failed"
                }
            }

            return {
                success: true,
                message: result.message,
                data: result.data

            }
        }
        catch (error) {
            console.error("Controller Error:", error);
            return {
                success: false,
                message: "Internal server error",
                data: null

            }
        }
    }
}
export default AppVersionController;