import React, {useEffect, useState} from "react";
import axios from "axios";
import './authForm.scss';
import {useAuth} from "../../services/auth/AuthContext";
import {AppleLogo, GoogleLogo, HiddenIcon, VisibleIcon} from "../../services/svg";
import {authMethod} from "../../services/params";

function AuthForm({currentAuthMethod}) {
    const [showPassword, setShowPassword] = useState({});
    const [formData, setFormData] = useState({});

    const { login } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (currentAuthMethod === authMethod.login) {
                const response = await axios.post("/api/login", (formData));
                const token = response.data.token;
                login(token);
            } else {
                const response = await axios.post("/api/register", (formData));
            }
        } catch (error) {
            console.error("Erreur de connexion :", error.response?.data || error.message);
            setFormData("");
        }
    }

    const handleChangeForm = (e) => {
        const keyName = e.currentTarget.name;
        const updatedFormData = {
            ...formData,
            [keyName]: e.currentTarget.value
        }
        setFormData(updatedFormData);
    }

    useEffect(() => {
        if (currentAuthMethod === authMethod.login) {
            setFormData({
                email: "",
                password: ""
            })
        } else {
            setFormData({
                firstName: "",
                name: "",
                email: "",
                password: "",
                confirmedPassword: ""
            })
        }

        setShowPassword({
            password: false,
            confirmedPassword: false
        });
    }, [currentAuthMethod]);

    return (
        <>
            <form onSubmit={handleSubmit} className="auth-form">

                {
                    currentAuthMethod === authMethod.register &&
                    <div className="auth-form-double-input-container">
                        {/* Email input */}
                        <div className="auth-form-input-container">
                            <label htmlFor="firstname" className="auth-label">Prénom :</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                className="auth-input"
                                name="firstname"
                                onChange={handleChangeForm}
                                required/>
                        </div>

                        {/* Email input */}
                        <div className="auth-form-input-container">
                            <label htmlFor="name" className="auth-label">Nom :</label>
                            <input
                                type="text"
                                value={formData.name}
                                className="auth-input"
                                name="name"
                                onChange={handleChangeForm}
                                required/>
                        </div>
                    </div>
                }

                {/* Email input */}
                <div className="auth-form-input-container">
                    <label htmlFor="email" className="auth-label">Adresse e-mail :</label>
                    <input
                        type="text"
                        value={formData.email}
                        className="auth-input"
                        name="email"
                        onChange={handleChangeForm}
                        required/>
                </div>

                {/* Password input */}
                <div className="auth-form-input-container">
                    <label htmlFor="password" className="auth-label">Mot de passe :</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword.password ? "text" : "password"}
                            value={formData.password}
                            className="auth-input"
                            name="password"
                            onChange={handleChangeForm}
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password-button"
                            onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}
                            aria-label="Afficher le mot de passe"
                        >
                            {showPassword.password ? <VisibleIcon/> : <HiddenIcon/>}
                        </button>
                    </div>
                </div>

                {/* Confirmed password input */}
                {
                    currentAuthMethod === authMethod.register &&
                    <div className="auth-form-input-container">
                        <label htmlFor="confirmedPassword" className="auth-label">Confirmez votre mot de passe :</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword.confirmedPassword ? "text" : "password"}
                                value={formData.confirmedPassword}
                                className="auth-input"
                                name="confirmedPassword"
                                onChange={handleChangeForm}
                                required
                            />

                            <button
                                type="button"
                                className="toggle-password-button"
                                onClick={() => setShowPassword({...showPassword, confirmedPassword: !showPassword.confirmedPassword})}
                                aria-label="Afficher le mot de passe"
                            >
                                {showPassword.confirmedPassword ? <VisibleIcon/> : <HiddenIcon/>}
                            </button>
                        </div>
                    </div>
                }

                <div className="auth-button-container">
                    <button type="submit" className="button-main auth-button">
                        {currentAuthMethod === authMethod.login ? 'Se connecter' : 'S\'inscrire'}
                    </button>

                    {
                        currentAuthMethod === authMethod.login &&
                        <div className="auth-external-buttons">
                            <a href="" className="button-secondary">
                                <AppleLogo/>
                                Se connecter avec Apple.
                            </a>
                            <a href="" className="button-secondary">
                                <GoogleLogo/>
                                Se connecter avec Google.
                            </a>
                        </div>
                    }
                </div>

            </form>
        </>
    )
}

export default AuthForm;
