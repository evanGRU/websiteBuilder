import React from "react";
import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <div>
            <h1>Il y a une erreur :/</h1>
            <Link to="/">Accueil</Link>
        </div>
    );
}

export default ErrorPage;
