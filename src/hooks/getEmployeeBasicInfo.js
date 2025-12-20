
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import ApiService from '../backend/apiService.js';

const useEmployeeBasicInfo = () => {

    const { employeeId } = useAuth();
    const [employeeBasicInfo, setEmployeeBasicInfo] = useState([]);


    const getEmployeeBasicInfo = useCallback(async () => {
        try {
            const response = await ApiService.getEmployeeBasicDetails(employeeId);
            const data = response.data;
            setEmployeeBasicInfo(data);
            console.log("Employee Basic info:", data)

        } catch (error) {
            console.error("Error fetching Employee Basic info:", error);
        }

    }, [employeeId]
    )
    useEffect(() => {
        getEmployeeBasicInfo();
    }, []);

    return employeeBasicInfo;
}

export default useEmployeeBasicInfo;