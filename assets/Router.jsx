import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Router;
