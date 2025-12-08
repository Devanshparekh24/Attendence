import CanteenMasterModel from '../models/CanteenMaster.js';

class CanteenMasterController {
    // GET /canteen-master
    static async getAll(req = {}) {
        try {
            const { name, active } = req.filters || {};
            let data;

            if (name || active !== undefined) {
                data = await CanteenMasterModel.findByCriteria({ name, active });
            } else {
                data = await CanteenMasterModel.findAll();
            }

            return {
                success: true,
                data: data.recordset || data,
                count: (data.recordset || data)?.length || 0,
                message: "Canteen master records retrieved successfully"
            };
        } catch (error) {
            console.error("CanteenMasterController.getAll error:", error);
            return {
                success: false,
                error: error.message,
                data: [],
                message: "Failed to retrieve canteen master records"
            };
        }
    }

    // GET /canteen-master/:id
    static async getById(req) {
        try {
            const { id } = req.params;

            if (!id) {
                return {
                    success: false,
                    error: "ID parameter is required",
                    data: null
                };
            }

            const data = await CanteenMasterModel.findById(id);

            if (data) {
                return {
                    success: true,
                    data: data,
                    found: true,
                    message: "Canteen master record found"
                };
            } else {
                return {
                    success: false,
                    data: null,
                    found: false,
                    message: "Canteen master record not found"
                };
            }
        } catch (error) {
            console.error("CanteenMasterController.getById error:", error);
            return {
                success: false,
                error: error.message,
                data: null,
                message: "Failed to retrieve canteen master record"
            };
        }
    }

    // Search canteen master records
    static async search(req) {
        try {
            const { query, active } = req.filters || {};

            if (!query) {
                return await this.getAll(req);
            }

            const data = await CanteenMasterModel.findByCriteria({
                name: query,
                active: active
            });

            return {
                success: true,
                data: data.recordset || data,
                count: (data.recordset || data)?.length || 0,
                message: `Found ${(data.recordset || data)?.length || 0} matching records`
            };
        } catch (error) {
            console.error("CanteenMasterController.search error:", error);
            return {
                success: false,
                error: error.message,
                data: [],
                message: "Search failed"
            };
        }
    }
}

export default CanteenMasterController;
