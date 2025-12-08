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

    // Database
    dbConnection,
    DatabaseConnection,
    getDatabaseConfig
} from '../backend';
