USE [SARP]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Update the procedure to RETURN the latest version details
ALTER PROCEDURE [dbo].[PRC_ATT_VERSION_CHK]
(
    @version_code INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Return the latest active version
    SELECT TOP 1 
        version_code,
        version_name,
        apk_url,        -- Required for download
        release_notes,  -- Required for message
        is_active,
        created_at
    FROM Att_app_version
    WHERE is_active = 1
    ORDER BY version_code DESC;
END
GO
