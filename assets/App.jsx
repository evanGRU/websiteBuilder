import React, {useEffect} from 'react';
import Router from './Router';
import './styles/app.scss'
import {useAuth} from "./services/auth/AuthContext";

function App() {
    const { isAuthenticated, navigate } = useAuth();
    useEffect(() => {
        if (isAuthenticated === false && location.pathname !== '/register' && location.pathname !== '/login') {
            console.log('test');
            navigate('/login');
        }
    }, [isAuthenticated]);

    return <Router />;
}

export default App;
