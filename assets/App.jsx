import React from 'react';
import Router from './Router';
import './styles/app.scss'
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <>
            <ToastContainer
                toastClassName="custom-toast"
                bodyClassName="custom-toast-body"
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
            />
            <Router />
        </>
    );
}

export default App;
