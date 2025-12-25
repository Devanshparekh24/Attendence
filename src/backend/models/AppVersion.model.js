import dbConnection from '../dbConnection.js';


class AppVersionModel {

    static async getAppVersion(versionData) {
        try {
            try {
                // User's SP ensures version exists and is active.
                // If version is valid, it returns nothing.
                // If version is invalid/old, it THROWS an error 'Please Update App'.
                await dbConnection.executeProcedure("PRC_ATT_VERSION_CHK", {
                    version_code: versionData.version_code
                });

                // If we get here, the version is valid (Active and matches DB).
                return {
                    success: true,
                    message: "App is up to date",
                    data: [] // No update needed
                };

            } catch (spError) {
                // If the SP throws an error, it implies the version is rejected (e.g. old).
                // We verify if it is the expected "Update" error or something else.
                const errorMessage = spError.message || spError.originalError?.message || '';
                
                if (errorMessage.includes('Please Update App') || errorMessage.includes('50001')) {
                    // The App is old. We need to fetch the LATEST version details to show the Update Dialog.
                    console.log("Version check failed (Expected). Fetching latest version details...");
                    
                    const query = `
                        SELECT TOP 1 
                            version_code, 
                            version_name, 
                            apk_url, 
                            release_notes, 
                            is_active, 
                            created_at 
                        FROM Att_app_version 
                        WHERE is_active = 1 
                        ORDER BY version_code DESC
                    `;
                    
                    const latestVersionData = await dbConnection.executeQuery(query);
                    
                    return {
                        success: true,
                        message: "Update available",
                        data: latestVersionData 
                    };
                } else {
                    // Genuine database error
                    throw spError;
                }
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
