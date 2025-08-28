import React, {useState} from 'react';
import './typographyInputs.scss';
import {ArrowIcon} from "../../../services/svg";
import GoogleFontsModal from "../../modals/googleFontsModal/GoogleFontsModal";
import {alignObjects, fontSizeDefaultValues, fontStyleValues} from "../../../services/params";
import {useGoogleFonts} from "../../../services/contexts/GoogleFontsContext";
import {useComponentsManager} from "../../../services/contexts/ComponentsManagerContext";


const TypographyInputs = ({componentFontStyles}) => {
    const [displayFontModal, setDisplayFontModal] = useState(false);
    const [selectorsStates, setSelectorsStates] = useState({
        fontStyle: false,
        fontSize: false
    });

    const [tempFontFamily, setTempFontFamily] = useState(null);

    const { fontsList } = useGoogleFonts();
    const { handleChangeComponent } = useComponentsManager();

    const rawFont = fontsList.find(f => f.family === componentFontStyles.family);

    const getFontStyleValue = () => {
        switch (componentFontStyles.fontStyle) {
            case 'normal':
                if (componentFontStyles.fontWeight === '400') {
                    return 'regular';
                } else {
                    return componentFontStyles.fontWeight;
                }
            case 'italic':
                if (componentFontStyles.fontWeight === '400') {
                    return 'italic';
                } else {
                    return componentFontStyles.fontWeight + 'italic';
                }
        }
    }

    const handleOpenSelector = (selectorType) =>
        setSelectorsStates(prev => ({...prev, [selectorType]: true}));

    const handleCloseModal = () => setDisplayFontModal(false);

    const handleChangeFont = font => {
        setTempFontFamily(font);
        handleChangeComponent("fontFamily", font.family);
        setDisplayFontModal(false);
    };

    const updateFontStyle = (prop, value) => {
        handleChangeComponent(prop, value);
    };

    const handleChangeSelector = (selectorType, value) => {
        updateFontStyle(selectorType, value);
        setSelectorsStates(prev => ({ ...prev, [selectorType]: false }));
    };

    return (
        <div className={"typography-container"}>
            <div className={"font-input"} onClick={() => setDisplayFontModal(prev => !prev)}>
                <p>{tempFontFamily?.family || componentFontStyles.family}</p>
                <ArrowIcon/>
            </div>

            <div className={"font-detail-inputs"}>
                {/* Font Style Selector */}
                <div className="font-weight-container">
                    <ul className={selectorsStates.fontStyle ? "font-details-options-open" : ""}>
                        {rawFont?.variants?.map(v => (
                            <li
                                key={`fontStyle-${v}`}
                                className={v === getFontStyleValue() ? "selected-font-option" : ""}
                                onClick={() => handleChangeSelector("fontStyle", v)}
                            >
                                {fontStyleValues[v]}
                            </li>
                        ))}
                    </ul>

                    <div className="font-weight-input" onClick={() => handleOpenSelector("fontStyle")}>
                        <p>{fontStyleValues[getFontStyleValue()]}</p>
                        <ArrowIcon />
                    </div>
                </div>

                {/* Font Size Selector */}
                <div className="font-size-container">
                    <ul className={selectorsStates.fontSize ? "font-details-options-open" : ""}>
                        {fontSizeDefaultValues.map(size => (
                            <li
                                key={`fontSize-${size}`}
                                className={size === componentFontStyles.fontSize ? "selected-font-option" : ""}
                                onClick={() => handleChangeSelector("fontSize", size)}
                            >
                                {size}
                            </li>
                        ))}
                    </ul>

                    <div className="font-size-input">
                        <input
                            type="text"
                            value={componentFontStyles.fontSize}
                            onChange={e => updateFontStyle("fontSize", e.target.value)}
                        />
                        <button onClick={() => handleOpenSelector("fontSize")}>
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Text Align Buttons */}
            <div className="align-buttons-container">
                {alignObjects.map(a => (
                    <button
                        key={a.code}
                        className={componentFontStyles.textAlign === a.code ? "align-selected" : ""}
                        onClick={() => updateFontStyle("textAlign", a.code)}
                    >
                        {a.icon}
                    </button>
                ))}
            </div>

            {displayFontModal && (
                <GoogleFontsModal
                    currentFont={componentFontStyles.family}
                    setTempFontFamily={setTempFontFamily}
                    handleCloseModal={handleCloseModal}
                    handleChange={handleChangeFont}
                />
            )}
        </div>
    );
};

export default TypographyInputs;


