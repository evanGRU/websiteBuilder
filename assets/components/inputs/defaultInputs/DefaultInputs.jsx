import React from 'react';
import './defaultInputs.scss';
import {useComponentsManager} from "../../../services/contexts/ComponentsManagerContext";
import {defaultInputLabels} from "../../../services/params";

const DefaultInputs = ({inputType, componentStyleValues}) => {
    const { handleChangeComponent } = useComponentsManager();

    const getDefaultInputKeyValues = () => {
        return Object.entries(componentStyleValues).map(([key, value]) => ({
            prop: key,
            value: value ?? 0,
            label: defaultInputLabels[key] || key.toUpperCase(), // fallback si pas dans defaultInputLabels
        }));
    };

    const inputsData = getDefaultInputKeyValues();

    const updateInput = (prop, value) => handleChangeComponent(prop, value);

    return (
        <div className={"default-inputs-container"}>
            <div className={"default-inputs-wrapper"}>
                {inputsData.map((inputData) => (
                    <div className={"default-input"}>
                        <p>{inputData.label}</p>
                        <input
                            type="text"
                            name={inputData.prop}
                            value={parseInt(inputData.value)}
                            onChange={e => updateInput(inputData.prop, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            {inputType === "dimensions" && (<button>AR</button>)}
        </div>
    );
};

export default DefaultInputs;
