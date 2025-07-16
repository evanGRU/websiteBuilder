import './navbar.scss';
import React from "react";
import {Logo} from "../../services/svg";
import LoginButton from "../buttons/login/LoginButton";
import {useAuth} from "../../services/auth/AuthContext";
import AccountButton from "../buttons/account/AccountButton";


export default function Navbar() {
    const { isAuthPage, user } = useAuth();

    return (
        <div className="navbar-container">
            <a href="/">
                <Logo/>
            </a>

            <div className="navbar-buttons-container">
                {!isAuthPage ?
                    user ?
                        <AccountButton/>
                        : <LoginButton/>
                    : ""
                }
            </div>
        </div>
    )
}
