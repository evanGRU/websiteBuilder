import './navbar.scss';
import React from "react";
import {AccountIcon, Logo, LogOutIcon, WebsitesIcon} from "../../services/svg";
import LoginButton from "../buttons/login/LoginButton";
import {useAuth} from "../../services/contexts/AuthContext";
import OpeningButton from "../buttons/openingButton/OpeningButton";


export default function Navbar() {
    const { isAuthPage, user, logout, navigate } = useAuth();

    return (
        <div className="navbar-container">
            <a href={user ? "/dashboard" : "/"}>
                <Logo/>
            </a>

            <div className="navbar-buttons-container">
                {!isAuthPage ?
                    user ?
                        <OpeningButton
                            name="accountButton"
                            title={user.fullname}
                            icon={<AccountIcon />}
                        >
                            <li><a href="#"><AccountIcon /> Mon compte</a></li>
                            <li><a href="/dashboard"><WebsitesIcon /> Mes sites</a></li>
                            <li>
                                <a href="/" onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                    navigate('/');
                                }}>
                                    <LogOutIcon /> Se déconnecter
                                </a>
                            </li>
                        </OpeningButton>
                        : <LoginButton/>
                    : ""
                }
            </div>
        </div>
    )
}
