// Services index - Clean exports for all services
export {
    // Main API service (backward compatibility)
    ApiService,

    // MVC Architecture
    router,
    Router,
    CanteenMasterController,
    UserController,
    AttendanceController,
    CanteenMasterModel,
    UserModel,
    AttendanceModel,
    AuthenticationController,
    AuthenticationModel,

    // Database
    dbConnection,
    DatabaseConnection,
    getDatabaseConfig
} from '../backend';
