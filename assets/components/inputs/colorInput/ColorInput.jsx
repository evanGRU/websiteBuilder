import React, {useState} from 'react';
import './colorInput.scss';
import {HiddenIcon, VisibleIcon} from "../../../services/svg";
import {HexColorPicker} from "react-colorful";
import EditDefaultModal from "../../modals/editDefaultModal/EditDefaultModal";
import {useComponentsManager} from "../../../services/contexts/ComponentsManagerContext";

const ColorInput = ({componentColorStyle}) => {
    const [hideColor, setHideColor] = useState(false);
    const [displayColorPickerModal, setDisplayColorPickerModal] = useState(false);

    const {handleChangeComponent} = useComponentsManager();

    const handleChange = (newColor) => {
        handleChangeComponent('color', newColor);
    }

    const handleClose = () => setDisplayColorPickerModal(false);

    return (
        <div className={"color-container"}>
            <div className={`color-input ${hideColor ? 'color-input-disabled' : ''}`}>
                <button
                    onClick={() => setDisplayColorPickerModal(prev => !prev)}
                    disabled={hideColor}
                >
                    <div className={"color-input-btn"} style={{ backgroundColor: componentColorStyle }}></div>
                </button>
                <input
                    type="text"
                    name="color"
                    value={componentColorStyle}
                    onChange={handleChange}
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
                <EditDefaultModal onClose={handleClose} title={"Changer la couleur"}>
                    <HexColorPicker color={componentColorStyle} onChange={handleChange} className="color-picker"/>
                </EditDefaultModal>
            )}
        </div>
    );
};

export default ColorInput;
