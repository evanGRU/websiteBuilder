import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/user/AuthPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Router;
