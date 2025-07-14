import React, {useState} from "react";
import axios from "axios";
import './loginForm.scss';
import {useAuth} from "../../services/auth/AuthContext";
import {AppleLogo, GoogleLogo, HiddenIcon, VisibleIcon} from "../../services/svg";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post("/api/login", { email, password });
            const token = response.data.token;
            login(token);
        } catch (error) {
            console.error("Erreur de connexion :", error.response?.data || error.message);
            setPassword("");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form-input-container">
                    <label htmlFor="email" className="auth-label">Adresse e-mail :</label>
                    <input
                        type="text"
                        value={email}
                        className="auth-input"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        required/>
                </div>

                <div className="auth-form-input-container">
                    <label htmlFor="password" className="auth-label">Mot de passe :</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            className="auth-input"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password-button"
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label="Afficher le mot de passe"
                        >
                            {showPassword ? <VisibleIcon/> : <HiddenIcon/>}
                        </button>
                    </div>
                </div>

                <div className="auth-button-container">
                    <button type="submit" className="button-main auth-button">Se connecter</button>

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
                </div>

            </form>
        </>
    )
}

export default LoginForm;
