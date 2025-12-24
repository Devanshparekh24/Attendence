import dbConnection from '../dbConnection.js';


class AppVersionModel {

    static async getAppVersion(versionData) {
        try {

            const { version_code } = versionData;

            const versionCode = version_code;

            const result = await dbConnection.executeProcedureWithResult("PRC_ATT_VERSION_CHK", {
                version_code: versionCode
            });
            console.log("Executing Query:", result); // Debug log

            return {
                success: true,
                message: "App version retrieved successfully",
                result
            }


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