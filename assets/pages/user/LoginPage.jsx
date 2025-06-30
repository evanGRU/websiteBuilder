import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        axios.post('/api/login', data)
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Mot de passe: </label>
                <input type="password" name="password" id="password" required />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    );
}

export default LoginPage;
