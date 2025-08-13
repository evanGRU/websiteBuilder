import React, {useEffect, useState} from 'react';
import './typographyInputs.scss';
import {ArrowIcon} from "../../../services/svg";
import GoogleFontsModal from "../../modals/googleFontsModal/GoogleFontsModal";
import {alignObjects, fontSizeDefaultValues, fontStyleValues, selectorTypes} from "../../../services/params";
import {useGoogleFonts} from "../../../services/contexts/GoogleFontsContext";


const TypographyInputs = ({componentFontStyles}) => {
    const [displayFontModal, setDisplayFontModal] = useState(false);
    const [selectorsStates, setSelectorsStates] = useState({
        style: false,
        size: false
    });
    const [rawFont, setRawFont] = useState({});
    const [newFontStyles, setNewFontStyles] = useState({});
    const [tempFontFamily, setTempFontFamily] = useState(null);

    const { fontsList } = useGoogleFonts();

    useEffect(() => {
        if (!fontsList.length) return;

        const initialFontStyles = { ...componentFontStyles };
        const raw = fontsList.find((font) => font.family === initialFontStyles.family);

        setNewFontStyles(initialFontStyles);
        setRawFont(raw);
    }, [fontsList, componentFontStyles]);

    const handleOpenSelector = (selectorType) => {
        setSelectorsStates(prev => ({
            ...prev,
            [selectorType]: true
        }));
    }
    const handleChangeSelector = (selectorType, newValue) => {
        setNewFontStyles(prev => ({
            ...prev,
            [selectorType]: newValue
        }));
        setSelectorsStates(prev => ({
            ...prev,
            [selectorType]: false
        }));
    }

    const handleCloseModal = () => {
        setDisplayFontModal(false);
    }

    const handleSubmit = (font) => {
        setNewFontStyles(prev => ({
            ...prev,
            family: font.family,
            style: font.variants.find(v => v === newFontStyles.style) || font.variants.find(v => v === "regular")  || font.variants[0]
        }));
        setRawFont(tempFontFamily);

        setDisplayFontModal(false);
    }

    return (
        <div className={"typography-container"}>
            <div
                className={"font-input"}
                onClick={() => setDisplayFontModal(prev => !prev)}
            >
                <p>{tempFontFamily ? tempFontFamily.family : newFontStyles.family}</p>
                <ArrowIcon/>
            </div>

            <div className={"font-detail-inputs"}>
                <div className={"font-weight-container"}>
                    <ul className={selectorsStates.style ? "font-details-options-open" : ""}>
                        {(rawFont?.variants || []).map(fontStyle => (
                            <li
                                className={fontStyle === newFontStyles.style ? "selected-font-option" : "" }
                                key={`fontStyle-${fontStyle}`}
                                value={fontStyle}
                                onClick={() => handleChangeSelector(selectorTypes.style, fontStyle)}
                            >
                                {fontStyleValues[fontStyle]}
                            </li>
                        ))}
                    </ul>

                    <div
                        className={"font-weight-input"}
                        onClick={() => handleOpenSelector(selectorTypes.style)}
                    >
                        <p>{fontStyleValues[newFontStyles.style]}</p>
                        <ArrowIcon/>
                    </div>
                </div>

                <div className={"font-size-container"}>
                    <ul className={selectorsStates.size ? "font-details-options-open" : ""}>
                        {fontSizeDefaultValues.map(fontSize => (
                            <li
                                className={fontSize === newFontStyles.size ? "selected-font-option" : "" }
                                key={`fontSize-${fontSize}`}
                                value={fontSize}
                                onClick={() => handleChangeSelector(selectorTypes.size, fontSize)}
                            >
                                {fontSize}
                            </li>
                        ))}
                    </ul>

                    <div className={"font-size-input"}>
                        <input
                            type="text"
                            value={newFontStyles.size}
                            onChange={(e) => {setNewFontStyles(prev => ({
                                ...prev,
                                size: e.target.value
                            }))}}
                        />
                        <button onClick={() => handleOpenSelector(selectorTypes.size)}>
                            <ArrowIcon/>
                        </button>
                    </div>

                </div>
            </div>

            <div className={"align-buttons-container"}>
                {alignObjects.map((alignItem) => {
                    return (
                        <button
                            className={newFontStyles.textAlign === alignItem.code ? "align-selected" : ""}
                            onClick={() => {setNewFontStyles(prev => ({
                                ...prev,
                                textAlign: alignItem.code
                            }))}}
                        >
                            {alignItem.icon}
                        </button>
                    )
                })}
            </div>


            {displayFontModal && (
                <GoogleFontsModal
                    currentFont={newFontStyles.family}
                    setTempFontFamily={setTempFontFamily}
                    handleCloseModal={handleCloseModal}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default TypographyInputs;


