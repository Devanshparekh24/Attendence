import canteenMasterRoutes from './canteenMaster.js';
import userRoutes from './user.js';
import attendanceRoutes from './attendance.js';

// Combine all routes
const routes = {
    ...canteenMasterRoutes,
    ...userRoutes,
    ...attendanceRoutes
};

// Simple router class (simulating Express.js router)
class Router {
    constructor() {
        this.routes = routes;
    }

    // Handle request by method and path
    async handle(method, path, req = {}) {
        const routeKey = `${method.toUpperCase()} ${path}`;

        console.log(`📡 Routing: ${routeKey}`);

        if (this.routes[routeKey]) {
            try {
                const result = await this.routes[routeKey](req);
                return result;
            } catch (error) {
                console.error(`❌ Route error for ${routeKey}:`, error);
                return {
                    success: false,
                    error: error.message,
                    message: "Internal server error"
                };
            }
        } else {
            console.warn(`⚠️  Route not found: ${routeKey}`);
            return {
                success: false,
                error: "Route not found",
                message: `Endpoint ${routeKey} does not exist`
            };
        }
    }

    // Helper method to parse URL and extract params
    static parseUrl(url) {
        // Simple URL parsing for demo purposes
        // In a real app, you'd use a proper URL parser
        const parts = url.split('/');
        const params = {};

        // Extract parameters from URL
        // This is a simplified implementation
        if (parts.length > 2) {
            if (parts[2] && !isNaN(parts[2])) {
                params.id = parts[2];
            }
            if (parts[2] === 'user' && parts[3] && !isNaN(parts[3])) {
                params.userId = parts[3];
            }
            if (parts[2] === 'email' && parts[3]) {
                params.email = parts[3];
            }
        }

        return params;
    }
}

const router = new Router();

export default router;
export { Router };
