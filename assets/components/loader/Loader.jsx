import './loader.scss';
import React from "react";


export default function Loader({fullScreen}) {
    return (
        <div className={`builder-loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}>
            <div className="loader"></div>
            <p>Chargement en cours.</p>
        </div>
    )
}
