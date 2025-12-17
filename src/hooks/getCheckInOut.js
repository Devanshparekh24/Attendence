import { useCallback } from 'react';
import { ApiService } from '../backend';
import { useAuth } from '../context/AuthContext.js';
import { useLocation } from '../context/LocationContext.js';
import formatTime from '../utils/formatTime.js';

// Custom hook to fetch and update check-in/out status
const useGetCheckInOut = () => {
  const { employeeId } = useAuth();
  const {
    setCheckInTime,
    setCheckOutTime,
    setIsCheckedIn,
  } = useLocation();

  const getCheckInOut = useCallback(async () => {
    try {

      setCheckInTime(null);
      setCheckOutTime(null);

      if (!employeeId) return;

      console.log('📡 Fetching check-in/out for employee:', employeeId);

      const response = await ApiService.getCheckInOut(employeeId);
      if (!response?.success || !response?.data) {
        console.log('❌ Invalid API response123:', response);
        return;
      }

      const { check_in, check_out } = response.data;

      const formattedCheckIn = check_in ? formatTime(check_in) : null;
      const formattedCheckOut = check_out ? formatTime(check_out) : null;

      setCheckInTime(formattedCheckIn);
      setCheckOutTime(formattedCheckOut);
      if (formattedCheckIn && formattedCheckOut) 
        setIsCheckedIn(false);
      else if (formattedCheckIn)
        setIsCheckedIn(true);
      else
        setIsCheckedIn(false);

      console.log('✅ Check-In:', formattedCheckIn);
      console.log('✅ Check-Out:', formattedCheckOut);
    } catch (error) {
      console.log('❌ getCheckInOut error:', error);
    }
  }, [employeeId, setCheckInTime, setCheckOutTime]);

  // 🔥 IMPORTANT
  return getCheckInOut;
};

export default useGetCheckInOut;
