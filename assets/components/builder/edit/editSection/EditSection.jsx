import React from 'react';
import './editSection.scss';
import DimensionsInputs from "../../../inputs/dimensionsInputs/DimensionsInputs";
import ColorInput from "../../../inputs/colorInput/ColorInput";
import TypographyInputs from "../../../inputs/typographyInputs/TypographyInputs";
import {componentTypes} from "../../../../services/params";
import {formatComponentStyle} from "../../../../services/functions/globalFunctions";

const EditSection = ({componentToEdit}) => {
    const formatedComponentStyle = componentToEdit && formatComponentStyle(componentToEdit);

    return (
        <div className={"builder-edit-section"}>
            <h3>Style de la page</h3>
            <div className={"builder-edit-item-container"}>
                <p>Dimensions</p>
                <DimensionsInputs/>
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
