import './navbar.scss';
import React from "react";
import {Logo} from "../../services/svg";
import ThemeButton from "../buttons/themebutton/ThemeButton";
import LoginButton from "../buttons/login/LoginButton";
import {useAuth} from "../../services/auth/AuthContext";


export default function Navbar() {
    const { isAuthPage } = useAuth();

    return (
        <div className="navbar-container">
            <div className="navbar-left-part-container">
                <a href="/">
                    <Logo/>
                </a>
            </div>
            <div className="navbar-center-container">
                <p className="poppins-extralight">Constructeur de site web.</p>
            </div>
            <div className="navbar-buttons-container">
                {!isAuthPage && <LoginButton/>}
                <ThemeButton/>
            </div>
        </div>
    )
}
