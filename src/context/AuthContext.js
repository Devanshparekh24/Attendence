import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    // You can also add other shared state related to location here, e.g., address, error

    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    return (
        <AuthContext.Provider
            value={{

                employeeId,
                setEmployeeId,
                password,
                setPassword,
                showPassword,
                setShowPassword,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
