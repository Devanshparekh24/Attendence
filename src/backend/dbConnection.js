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
  // Execute a stored procedure with parameters (for INSERT/UPDATE/DELETE operations)
  async executeProcedure(procedureName, params = {}) {
    try {
      console.log(`🔌 Preparing to execute procedure: ${procedureName}`);
      console.log(`📦 Parameters:`, params);

      // Build parameter list for EXEC statement in the order they appear in the object
      const paramValues = Object.values(params).map(value => {
        let formattedValue;

        if (value === null || value === undefined) {
          formattedValue = 'NULL';
        } else if (typeof value === 'string') {
          // Escape single quotes and wrap in quotes
          formattedValue = `'${value.replace(/'/g, "''")}'`;
        } else if (value instanceof Date) {
          // Format date as ISO string and wrap in quotes
          const dateStr = value.toISOString().slice(0, 19).replace('T', ' ');
          formattedValue = `'${dateStr}'`;
        } else if (typeof value === 'number') {
          // Numbers don't need quotes
          formattedValue = value;
        } else {
          // Fallback: convert to string and quote
          formattedValue = `'${String(value).replace(/'/g, "''")}'`;
        }

        return formattedValue;
      });

      const execQuery = `EXEC ${procedureName} ${paramValues.join(', ')}`;

      console.log("⚡ Generated Procedure Query:", execQuery);

      // Execute using executeUpdate for procedures that don't return data
      const result = await this.executeUpdate(execQuery);

      console.log("✅ Procedure executed successfully");
      return result;

    } catch (error) {
      console.error("❌ Procedure Execution Error:", error);
      throw error;
    }
  }

  // Execute a stored procedure that returns data (for SELECT operations)
  async executeProcedureWithResult(procedureName, params = {}) {
    try {
      console.log(`🔌 Preparing to execute procedure with result: ${procedureName}`);
      console.log(`📦 Parameters:`, params);

      // Build parameter list for EXEC statement in the order they appear in the object
      const paramValues = Object.values(params).map(value => {
        let formattedValue;

        if (value === null || value === undefined) {
          formattedValue = 'NULL';
        } else if (typeof value === 'string') {
          // Escape single quotes and wrap in quotes
          formattedValue = `'${value.replace(/'/g, "''")}'`;
        } else if (value instanceof Date) {
          // Format date as ISO string and wrap in quotes
          const dateStr = value.toISOString().slice(0, 19).replace('T', ' ');
          formattedValue = `'${dateStr}'`;
        } else if (typeof value === 'number') {
          // Numbers don't need quotes
          formattedValue = value;
        } else {
          // Fallback: convert to string and quote
          formattedValue = `'${String(value).replace(/'/g, "''")}'`;
        }

        return formattedValue;
      });

      const execQuery = `EXEC ${procedureName} ${paramValues.join(', ')}`;

      console.log("⚡ Generated Procedure Query:", execQuery);

      // Execute using executeQuery to get returned data
      const result = await this.executeQuery(execQuery);

      console.log("✅ Procedure executed successfully with result");
      return result;

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
