import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function isTokenValid(token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    }

    async function validateToken(token) {
        if (!token || !isTokenValid(token)) {
            console.log('valid');
            logout();
            return;
        }

        try {
            const response = await axios.get("/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data.email);
        } catch (error) {
            logout();
        }
    }

    function login(token) {
        localStorage.setItem("token", token);
        validateToken(token);
        navigate('/');
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }

    useEffect(() => {
        if (location.pathname !== '/register'){
            validateToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, navigate }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
