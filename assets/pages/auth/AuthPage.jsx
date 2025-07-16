import React from "react";
import './authPage.scss';
import Navbar from "../../components/navbar/Navbar";
import AuthForm from "../../components/authForm/AuthForm";

function AuthPage() {

    return (
        <>
            <Navbar/>
            <div className="auth-container">
                <div className="auth-form-container">
                    <AuthForm />
                </div>
            </div>
        </>
    )
}

export default AuthPage;
