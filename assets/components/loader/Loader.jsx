import './loader.scss';
import React from "react";


export default function Loader({fullScreen, text}) {
    return (
        <div className={`builder-loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}>
            <div className="loader"></div>
            <p>{ text ?? "Chargement en cours."}</p>
        </div>
    )
}
