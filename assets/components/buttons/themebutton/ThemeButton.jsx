import './themebutton.scss';
import React, {useState} from "react";
import {DarkIcon, LightIcon} from "../../../services/svg";
import {theme} from "../../../services/params";

export default function ThemeButton() {
    const [currentTheme, setCurrentTheme] = useState(theme.light);

    return (
        <div
            className={`theme-button-container ${currentTheme === theme.light ? "dark" : "light"}`}
            onClick={() => currentTheme === theme.light ? setCurrentTheme(theme.dark) : setCurrentTheme(theme.light)}
        >
            {
                currentTheme === theme.light ? <DarkIcon/> : <LightIcon/>
            }
        </div>
    )
}
