import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AuthPage from "./pages/auth/AuthPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import BuilderPage from "./pages/builder/BuilderPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/builder/:id" element={<BuilderPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Router;
