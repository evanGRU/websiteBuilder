import React, {useEffect, useState} from "react";
import axios from "axios";
import './authForm.scss';
import {useAuth} from "../../services/auth/AuthContext";
import {AppleLogo, GoogleLogo, HiddenIcon, VisibleIcon} from "../../services/svg";
import {authMethod} from "../../services/params";
import {toast} from "react-toastify";

function AuthForm() {
    const [currentAuthMethod, setCurrentAuthMethod] = useState(authMethod.login);

    const [showPassword, setShowPassword] = useState({});
    const [formData, setFormData] = useState({});

    const { login } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if (currentAuthMethod === authMethod.login) {
                const response = await axios.post("/api/login", (formData));
                toast.success("Vous êtes connecté.");
                login(response.data.token);
            } else {
                const response = await axios.post("/api/register", (formData));
                toast.success("Vous êtes désormais inscrit. Connectez-vous pour accéder à votre compte.");
                setCurrentAuthMethod(authMethod.login);
            }
        } catch (error) {
            toast.error("Une erreur s'est produite, veuillez réessayer.");
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
                firstname: "",
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
            <div className="auth-titles">
                {
                    currentAuthMethod === authMethod.login ?
                        <>
                            <h1 className="poppins-semibold">Se connecter</h1>
                            <div className="auth-titles-container">
                                <h4 className="poppins-light">Vous n'avez pas encore de compte ?</h4>
                                <p
                                    onClick={() => {setCurrentAuthMethod(authMethod.register)}}
                                    className="poppins-light"
                                >
                                    S'inscrire
                                </p>
                            </div>
                        </> :
                        <>
                            <h1 className="poppins-semibold">S'inscrire</h1>
                            <div className="auth-titles-container">
                                <h4 className="poppins-light">Vous avez déjà un compte ?</h4>
                                <p
                                    onClick={() => {setCurrentAuthMethod(authMethod.login)}}
                                    className="poppins-light"
                                >
                                    Se connecter
                                </p>
                            </div>
                        </>
                }
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

                {
                    currentAuthMethod === authMethod.register &&
                    <div className="auth-form-double-input-container">
                        {/* Firstname input */}
                        <div className="auth-form-input-container">
                            <input
                                type="text"
                                value={formData.firstname}
                                className="auth-input"
                                name="firstname"
                                onChange={handleChangeForm}
                                placeholder=""
                                required
                            />
                            <label htmlFor="firstname" className="auth-label">Prénom :</label>
                        </div>

                        {/* Name input */}
                        <div className="auth-form-input-container">
                            <input
                                type="text"
                                value={formData.name}
                                className="auth-input"
                                name="name"
                                onChange={handleChangeForm}
                                placeholder=""
                                required
                            />
                            <label htmlFor="name" className="auth-label">Nom :</label>
                        </div>
                    </div>
                }

                {/* Email input */}
                <div className="auth-form-input-container">
                    <input
                        type="text"
                        value={formData.email}
                        className="auth-input"
                        name="email"
                        onChange={handleChangeForm}
                        placeholder=""
                        required
                    />
                    <label htmlFor="email" className="auth-label">E-mail :</label>
                </div>

                {/* Password input */}
                <div className="auth-form-input-container">

                    <div className="password-input-container">
                        <input
                            type={showPassword.password ? "text" : "password"}
                            value={formData.password}
                            className="auth-input"
                            name="password"
                            onChange={handleChangeForm}
                            placeholder=""
                            required
                        />

                        <label htmlFor="password" className="auth-label">Mot de passe :</label>

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
                        <div className="password-input-container">
                            <input
                                type={showPassword.confirmedPassword ? "text" : "password"}
                                value={formData.confirmedPassword}
                                className="auth-input"
                                name="confirmedPassword"
                                onChange={handleChangeForm}
                                placeholder=""
                                required
                            />

                            <label htmlFor="confirmedPassword" className="auth-label">Confirmez votre mot de passe :</label>

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

                <div className="auth-buttons-container">
                    <button type="submit" className="button-main auth-submit-button">
                        {currentAuthMethod === authMethod.login ? 'Se connecter' : 'S\'inscrire'}
                    </button>



                    {
                        currentAuthMethod === authMethod.login &&
                        <>
                            <div className="auth-method-separator">
                                <div className="auth-line"></div>
                                <p>ou</p>
                                <div className="auth-line"></div>
                            </div>

                            <div className="auth-external-links">
                                <a href="" className="external-link-button">
                                    <div className="external-link-logo">
                                        <AppleLogo/>
                                    </div>
                                    <div className="external-link-text">
                                        Se connecter avec Apple.
                                    </div>
                                </a>

                                <a href="" className="external-link-button">
                                    <div className="external-link-logo">
                                        <GoogleLogo/>
                                    </div>
                                    <div className="external-link-text">
                                        Se connecter avec Google.
                                    </div>
                                </a>

                                <a href="/dashboard" className="button-secondary">
                                    Dashboard
                                </a>
                            </div>
                        </>
                    }
                </div>
            </form>
        </>
    )
}

export default AuthForm;
