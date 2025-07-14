import React, {useState} from "react";
import './authPage.scss';
import BackgroundImg from "../../images/bg-temp.jpg";
import {LeftArrowIcon, RightArrowIcon} from "../../services/svg";
import Navbar from "../../components/navbar/Navbar";
import {authMethod} from "../../services/params";
import AuthForm from "../../components/authForm/AuthForm";

function AuthPage() {
    const [currentAuthMethod, setCurrentAuthMethod] = useState(authMethod.login);

    return (
        <>
            <Navbar/>
            <div className="auth-container">
                <div className="auth-left-part-container">
                    <img src={BackgroundImg} alt="Background" className="background-image" />

                    <div className="arrow left-arrow">
                        <LeftArrowIcon />
                    </div>

                    <div className="arrow right-arrow">
                        <RightArrowIcon />
                    </div>
                </div>

                <div className="auth-right-part-container">
                    <div className="form-nav">
                        <div
                            className={`form-nav-button ${currentAuthMethod === authMethod.login && "form-nav-button-selected"}`}
                            onClick={() => setCurrentAuthMethod(authMethod.login)}
                        >
                            <p>/Connexion</p>
                        </div>

                        <div
                            className={`form-nav-button ${currentAuthMethod === authMethod.register && "form-nav-button-selected"}`}
                            onClick={() => setCurrentAuthMethod(authMethod.register)}
                        >
                            <p>/Inscription</p>
                        </div>

                        <div className="decoration-bar"></div>
                    </div>

                    <div className="auth-form-container">
                        <AuthForm
                            currentAuthMethod={currentAuthMethod}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthPage;
