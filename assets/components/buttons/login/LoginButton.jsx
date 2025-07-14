import './loginbutton.scss';
import React from "react";
import {useAuth} from "../../../services/auth/AuthContext";


export default function LoginButton() {
    const { navigate } = useAuth();

    return (
        <div
            className="login-button-container"
            onClick={() => navigate('/auth')}
        >
            <p className="poppins-medium">Se connecter</p>
        </div>
    )
}
