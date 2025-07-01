import React  from "react";
import {useAuth} from "../../services/auth/AuthContext";

function HomePage() {
    const { user, logout } = useAuth();

    return (
        <>
            <h1>Accueil</h1>
            <div>
                <p>User : {user}</p>
                <button onClick={logout} className='button-main'>Se déconnecter</button>
            </div>
        </>
    );
}

export default HomePage;
