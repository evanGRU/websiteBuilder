import React, {useState} from "react";
import axios from "axios";
import './loginPage.scss';
import {useAuth} from "../../services/auth/AuthContext";

function LoginPage() {
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
        }
    }

    return (
        <div className="content-container">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-title">
                    <h2>Connexion</h2>
                    <hr/>
                </div>
                <div>
                    <label>Email :</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label>Mot de passe :</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                <div className="buttons-container">
                    <button type="submit" className="button-main">Se connecter</button>
                    <a href="/register">Pas encore inscrit?</a>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
