ALTER PROCEDURE [dbo].[PRC_ATT_CHECKIN_INS]
(
    @emp_code        INT,
    @android_id      VARCHAR(100),

    @latitude_in     DECIMAL(10,7),
    @latitude_out    DECIMAL(10,7),

    @longitude_in    DECIMAL(10,7),
    @longitude_out   DECIMAL(10,7),

    @accuracy_in     DECIMAL(6,2),
    @accuracy_out    DECIMAL(6,2),

    @check_in        DATETIME2(3),
    @check_out       DATETIME2(3),

    @Is_Visit        BIT
)
AS
BEGIN
    SET NOCOUNT ON;

    /* 1️⃣ Prevent double check-in */
    IF EXISTS (
        SELECT 1
        FROM Att_EmpAttendance
        WHERE ISNULL(IsNotValid,0)=0
          AND emp_code = @emp_code
          AND created_at >= CONVERT(date,GETDATE())
          AND created_at <  DATEADD(DAY,1,CONVERT(date,GETDATE()))
    )
    BEGIN
        THROW 50001, 'You Have Already Checked In Today!! Can Not Check In Again.', 1;
        RETURN;
    END

    DECLARE @BRANCH_ID INT;
    DECLARE @IS_MOVING BIT;

    SELECT
        @BRANCH_ID = BRANCH_ID,
        @IS_MOVING = IS_MOVING
    FROM [PAYROLL-1-2025-2026].dbo.Emp_Master
    WHERE Code = @emp_code;

    /* 2️⃣ Location validation for NON-MOVING employees */
    IF ISNULL(@IS_MOVING,0) = 0
    BEGIN
        DECLARE
            @office_lat   FLOAT,
            @office_lon   FLOAT,
            @radius       FLOAT,
            @distance     FLOAT,
            @finalRadius  FLOAT;

        SELECT
            @office_lat = Latitude,
            @office_lon = Longitude,
            @radius     = Allowed_radius_meter
        FROM Customer_Master
        WHERE CustID = @BRANCH_ID;

        /* Real distance in meters */
        SET @distance =
        6371000 * ACOS(
            COS(RADIANS(@office_lat)) * COS(RADIANS(@latitude_in)) *
            COS(RADIANS(@longitude_in) - RADIANS(@office_lon))
          + SIN(RADIANS(@office_lat)) * SIN(RADIANS(@latitude_in))
        );

        /* Accuracy-aware radius */
        SET @finalRadius = @radius + ISNULL(@accuracy_in,0);

        /* Out of range */
        IF (@distance > @finalRadius)
        BEGIN
            INSERT INTO Att_EmpAttendance
            (
                emp_code, android_id,
                [latitude_in ], longitude_in,
                accuracy_in, check_in,
                Is_Visit, IsNotValid
            )
            VALUES
            (
                @emp_code, @android_id,
                @latitude_in, @longitude_in,
                @accuracy_in, GETDATE(),
                @Is_Visit, 1
            );

            THROW 50001, 'You Are Out Of Range, Please Go To Allocated Area And Try Again !!', 1;
            RETURN;
        END
    END

    /* 3️⃣ Valid check-in */
    INSERT INTO Att_EmpAttendance
    (
        emp_code, android_id,
        [latitude_in ], longitude_in,
        accuracy_in, check_in,
        Is_Visit, IsNotValid
    )
    VALUES
    (
        @emp_code, @android_id,
        @latitude_in, @longitude_in,
        @accuracy_in, GETDATE(),
        @Is_Visit, 0
    );
END
GO


