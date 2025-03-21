import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context for the authentication state
const AuthContext = createContext();

// AuthProvider will provide the authentication state to the rest of the app
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the token exists in localStorage to determine if the user is logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if a token exists
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication state
export const useAuth = () => {
    return useContext(AuthContext);
};