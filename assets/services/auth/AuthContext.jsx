import React, { createContext, useContext, useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const isAuthPage = location.pathname === "/auth";

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
            logout();
            return;
        }

        try {
            const response = await axios.get("/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.setItem('user', response.data.email);
        } catch (error) {
            logout();
        }
    }

    function login(token) {
        localStorage.setItem("token", token);
        // validateToken(token); ???????????
        navigate('/');
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.setItem('user', '');
        navigate("/login");
    }

    useEffect(() => {
        // if (isRegisterPage){
        //     validateToken(token);
        // }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            navigate,
            isAuthPage
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
