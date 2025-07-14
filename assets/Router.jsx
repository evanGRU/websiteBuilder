import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import ErrorPage from "./pages/ErrorPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/*<Route path="/login" element={<AuthPage />} />*/}
            {/*<Route path="/register" element={<RegisterPage />} />*/}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Router;
