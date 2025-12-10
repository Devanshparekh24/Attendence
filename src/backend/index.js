// Backend services index - Traditional MVC structure
export { default as router } from './routes';
export { Router } from './routes';

// Controllers
export { default as CanteenMasterController } from './controllers/CanteenMasterController';
export { default as UserController } from './controllers/UserController';
export { default as AttendanceController } from './controllers/Attendance.controller';

// Models
export { default as CanteenMasterModel } from './models/CanteenMaster';
export { default as UserModel } from './models/User';
export { default as AttendanceModel } from './models/Attendance.model';

// Database
export { default as dbConnection } from './dbConnection';
export { DatabaseConnection } from './dbConnection';
export { getDatabaseConfig } from './database';

// Legacy API service for backward compatibility
export { default as ApiService } from './apiService';
