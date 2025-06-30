import React from "react";
import {Link} from "react-router-dom";

function HomePage() {

    return (
        <>
            <h1>Accueil</h1>
            <Link to={'/login'}>Se connecter</Link>
            <br/>
            <Link to={'/register'}>S'inscrire</Link>
        </>
    );
}

export default HomePage;
