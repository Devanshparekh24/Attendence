import EmployeeDetailController from "../controllers/EmployeeDetail.controller.js";

// Employee Detail Routes
const employeeDetailRoutes = {
    // GET /basic-details/emp_code
    'GET /basic-details/emp_code': async (req = {}) => {
        return await EmployeeDetailController.getBasicDetails(req);
    }
};

export default employeeDetailRoutes;
