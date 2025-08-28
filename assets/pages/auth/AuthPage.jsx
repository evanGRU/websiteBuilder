import React, {useEffect} from "react";
import './authPage.scss';
import Navbar from "../../components/navbar/Navbar";
import AuthForm from "../../components/authForm/AuthForm";
import {useAuth} from "../../services/contexts/AuthContext";

function AuthPage() {
    const { user, navigate } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user])

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
