import React, { createContext, useContext, useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    const checkToken = (token) => {
        if (token) {
            axios.get("/api/me", {
                headers: {Authorization: `Bearer ${token}`},
            }).then(response => {
                if (response) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    setUser(response.data);
                    navigate('/dashboard');
                } else {
                    logout();
                }
            });
        }
    }

    useEffect(() => {
        if (!user) {
            checkToken(token);
        }
    }, [token, user]);

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
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
