import React from 'react';
import './toolboxMenu.scss';
import {toolboxTexts} from "../../../services/params";
import {ButtonIcon, DivIcon, ImageIcon, TextIcon} from "../../../services/svg";

const ToolboxMenu = ({onClick, sectionData}) => {
    return (
        <div className="toolbox-menu">
            <button
                name="bloc"
                className={`toolbox-menu-item ${sectionData?.name === toolboxTexts.menuProperties.bloc.name ? "toolbox-menu-item-active" : ""}`}
                onClick={onClick}
            >
                <DivIcon/>
            </button>
            <button
                name="text"
                onClick={onClick}
                className={`toolbox-menu-item ${sectionData?.name === toolboxTexts.menuProperties.text.name ? "toolbox-menu-item-active" : ""}`}
            >
                <TextIcon/>
            </button>
            <button
                name="button"
                className={`toolbox-menu-item ${sectionData?.name === toolboxTexts.menuProperties.button.name ? "toolbox-menu-item-active" : ""}`}
                onClick={onClick}
            >
                <ButtonIcon/>
            </button>
            <button
                name="image"
                className={`toolbox-menu-item ${sectionData?.name === toolboxTexts.menuProperties.image.name ? "toolbox-menu-item-active" : ""}`}
                onClick={onClick}
            >
                <ImageIcon/>
            </button>
        </div>
    );
};

export default ToolboxMenu;
