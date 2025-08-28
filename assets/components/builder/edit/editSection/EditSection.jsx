import React from 'react';
import './editSection.scss';
import ColorInput from "../../../inputs/colorInput/ColorInput";
import TypographyInputs from "../../../inputs/typographyInputs/TypographyInputs";
import {componentTypes} from "../../../../services/params";
import {formatComponentStyle} from "../../../../services/functions/globalFunctions";
import DefaultInputs from "../../../inputs/defaultInputs/DefaultInputs";

const EditSection = ({componentToEdit}) => {
    const formatedComponentStyle = componentToEdit && formatComponentStyle(componentToEdit);

    const getDefaultInputsValues = (inputType) => {
        const mapping = {
            dimensions: { width: formatedComponentStyle?.width, height: formatedComponentStyle?.height },
            positions: { left: formatedComponentStyle?.left, top: formatedComponentStyle?.top }
        };

        return mapping[inputType] || { value1: 0, value2: 0 };
    };

    return (
        <div className={"builder-edit-section"}>
            <h3>Style de la page</h3>
            <div className={"builder-edit-item-container"}>
                <p>Dimensions</p>
                <DefaultInputs
                    inputType={"dimensions"}
                    componentStyleValues={getDefaultInputsValues("dimensions")}
                />
            </div>
            {
                componentToEdit?.type === componentTypes.text && (
                    <>
                        <div className={"builder-edit-item-container"}>
                            <p>Typographie</p>
                            <TypographyInputs componentFontStyles={formatedComponentStyle.font}/>
                        </div>

                        <div className={"builder-edit-item-container"}>
                            <p>Couleur de texte</p>
                            <ColorInput componentColorStyle={formatedComponentStyle.color}/>
                        </div>

                        <div className={"builder-edit-item-container"}>
                            <p>Positions</p>
                            <DefaultInputs
                                inputType={"positions"}
                                componentStyleValues={getDefaultInputsValues("positions")}
                            />
                        </div>
                    </>
                )
            }

            {
                componentToEdit?.type !== componentTypes.text && (
                    <div className={"builder-edit-item-container"}>
                        <p>Couleur de fond</p>
                        <ColorInput />
                    </div>
                )
            }



        </div>
    );
};

export default EditSection;
