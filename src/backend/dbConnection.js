import MSSQL from 'react-native-mssql';
import { getDatabaseConfig } from './database';

// Database connection class
class DatabaseConnection {
  constructor() {
    this.config = getDatabaseConfig();
    this.isConnected = false;
  }

  // Get connection configuration
  getConfig() {
    return this.config;
  }

  // Execute a query with automatic connection management
  async executeQuery(sqlQuery) {
    try {
      console.log("🔌 Connecting to database...");
      const connection = await MSSQL.connect(this.config);

      if (!connection) {
        throw new Error("Failed to establish database connection");
      }

      console.log("⚡ Executing query...");
      const result = await MSSQL.executeQuery(sqlQuery);

      console.log("✅ Query executed successfully");
      return result;
    } catch (error) {
      console.error("❌ Database Error:", error);
      throw error;
    } finally {
      try {
        await MSSQL.close();
        console.log("🔌 Connection closed");
      } catch (closeError) {
        console.warn("⚠️  Warning: Could not close connection", closeError);
      }
    }
  }
  // Execute a stored procedure with parameters
  async executeProcedure(procedureName, params = {}) {
    try {
      console.log(`🔌 Preparing to execute procedure: ${procedureName}`);
      
      // Construct parameter string for SQL command
      const paramList = Object.entries(params).map(([key, value]) => {
        let formattedValue = 'NULL';
        
        if (value === null || value === undefined) {
          formattedValue = 'NULL';
        } else if (typeof value === 'string') {
          // Escape single quotes properly for SQL
          formattedValue = `'${value.replace(/'/g, "''")}'`; 
        } else if (value instanceof Date) {
            // Basic date formatting - adjust format as needed for your DB
            formattedValue = `'${value.toISOString()}'`; 
        } else {
          // Numbers and others
          formattedValue = value;
        }

        return `@${key} = ${formattedValue}`;
      });

      const execQuery = `EXEC ${procedureName} ${paramList.join(', ')}`;
      
      console.log("⚡ Generated Procedure Query:", execQuery);

      // Reuse the existing executeUpdate method which handles connection/execution
      return await this.executeUpdate(execQuery);

    } catch (error) {
      console.error("❌ Procedure Execution Error:", error);
      throw error;
    }
  }
  // Execute an update/insert query
  async executeUpdate(sqlQuery) {
    try {
      console.log("🔌 Connecting to database for update...");
      const connection = await MSSQL.connect(this.config);

      if (!connection) {
        throw new Error("Failed to establish database connection");
      }

      console.log("⚡ Executing update...");
      const result = await MSSQL.executeUpdate(sqlQuery);

      console.log("✅ Update executed successfully");
      return result;
    } catch (error) {
      console.error("❌ Database Update Error:", error);
      throw error;
    } finally {
      try {
        await MSSQL.close();
        console.log("🔌 Connection closed");
      } catch (closeError) {
        console.warn("⚠️  Warning: Could not close connection", closeError);
      }
    }
  }

  // Test connection
  async testConnection() {
    try {
      await this.executeQuery("SELECT 1 as test");
      console.log("✅ Database connection test successful");
      return true;
    } catch (error) {
      console.error("❌ Database connection test failed:", error);
      return false;
    }
  }
}

// Export singleton instance
const dbConnection = new DatabaseConnection();

export default dbConnection;
export { DatabaseConnection };
