import dbConnection from '../dbConnection.js';


class AppVersionModel {

    static async getAppVersion(versionData) {
        try {
            // Call the corrected SP which returns the latest version details
            const result = await dbConnection.executeProcedureWithResult("PRC_ATT_VERSION_CHK", {
                version_code: versionData.version_code
            });

            console.log("Database result:", result);

            return {
                success: true,
                message: "App version checked successfully",
                data: result
            };

        } catch (error) {
            console.error("SQL Error:", error);
            return {
                success: false,
                message: error.originalError?.message || error.message
            }
        }

    }
}

export default AppVersionModel;
