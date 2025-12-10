import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);

    // You can also add other shared state related to location here, e.g., address, error
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);


    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                address,
                setAddress,
                error,
                setError,
                loading,
                setLoading,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
