import React, {useEffect, useState} from 'react';
import './colorInput.scss';
import {HiddenIcon, VisibleIcon} from "../../../services/svg";
import {HexColorPicker} from "react-colorful";
import EditDefaultModal from "../../modals/editDefaultModal/EditDefaultModal";

const ColorInput = ({componentColorStyle}) => {
    const [colorValue, setColorValue] = useState("");
    const [hideColor, setHideColor] = useState(false);
    const [displayColorPickerModal, setDisplayColorPickerModal] = useState(false);

    useEffect(() => {
        setColorValue(componentColorStyle);
    }, [componentColorStyle]);

    return (
        <div className={"color-container"}>
            <div className={`color-input ${hideColor ? 'color-input-disabled' : ''}`}>
                <button
                    onClick={() => setDisplayColorPickerModal(prev => !prev)}
                    disabled={hideColor}
                >
                    <div className={"color-input-btn"} style={{ backgroundColor: colorValue }}></div>
                </button>
                <input
                    type="text"
                    name="color"
                    value={colorValue}
                    onChange={(e) => {setColorValue(e.target.value)}}
                    disabled={hideColor}
                />
            </div>
            <div
                className={"color-visibility-button"}
                onClick={() => setHideColor(prev => !prev)}
            >
                {!hideColor ? <VisibleIcon/> : <HiddenIcon/>}
            </div>

            {displayColorPickerModal && (
                <EditDefaultModal setter={setDisplayColorPickerModal} title={"Changer la couleur"}>
                    <HexColorPicker color={colorValue} onChange={setColorValue} className="color-picker"/>
                </EditDefaultModal>
            )}
        </div>
    );
};

export default ColorInput;
