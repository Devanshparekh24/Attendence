// Database configuration
// In production, use react-native-config or similar for environment variables

const databaseConfig = {
  development: {
    server: process.env.DB_SERVER || '136.232.118.110',
    port: parseInt(process.env.DB_PORT) || 1433,
    username: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || 'topface',
    database: process.env.DB_DATABASE || 'SARP',
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 15000,
    requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT) || 15000
  },
  production: {
    // Add production config here
    server: process.env.DB_SERVER || 'your-production-server',
    port: parseInt(process.env.DB_PORT) || 1433,
    username: process.env.DB_USERNAME || 'your-prod-username',
    password: process.env.DB_PASSWORD || 'your-prod-password',
    database: process.env.DB_DATABASE || 'your-prod-database',
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 30000,
    requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT) || 30000
  }
};

// Get current environment (you can set this based on __DEV__ or custom logic)
const getCurrentEnvironment = () => {
  return __DEV__ ? 'development' : 'production';
};

// Export the config for current environment
export const getDatabaseConfig = () => {
  const env = getCurrentEnvironment();
  return databaseConfig[env];
};

export default databaseConfig;
