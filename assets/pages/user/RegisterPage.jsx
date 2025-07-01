import React, {useState} from "react";
import axios from "axios";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post("/api/register", { email, password });
            console.log(response)
        } catch (error) {
            console.error("Erreur de connexion :", error.response?.data || error.message);
        }
    }


    return (
        <div className="content-container">
            <form onSubmit={handleSubmit} className="form">
                <div className="form-title">
                    <h2>Inscription</h2>
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
                    <button type="submit" className="button-main">S'inscrire</button>
                    <a href="/login">Déjà inscrit?</a>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
