import React, {createContext, useContext, useState} from "react";
import {componentStyles, defaultComponentStylesValues, toolboxTexts} from "../params";

const InteractContext = createContext();

export function InteractProvider({ children }) {
    const [componentDataToAdd, setComponentDataToAdd] = useState(null);

    const initTextFormData = (event) => {
        const element = event.currentTarget;
        const tagKey = element.dataset.key

        setComponentDataToAdd({
            projectId: localStorage.getItem("projectId"),
            type: "text",
            content: {
                tag: tagKey,
                value: toolboxTexts.menuProperties.text.defaultValues[tagKey],
            },
            styles: [
                {
                    property: {
                        code : 'fontFamily'
                    },
                    value: defaultComponentStylesValues.fontFamily
                },
                {
                    property: {
                        code : 'fontStyle'
                    },
                    value: defaultComponentStylesValues.fontStyle
                },
                {
                    property: {
                        code : 'fontSize'
                    },
                    value: componentStyles.fontSize[tagKey]
                },
                {
                    property: {
                        code : 'textAlign'
                    },
                    value: defaultComponentStylesValues.textAlign
                },
                {
                    property: {
                        code : 'color'
                    },
                    value: '#000000'
                }
            ]
        })
    }

    return (
        <InteractContext.Provider value={{
            componentDataToAdd,
            initTextFormData,
        }}>
            {children}
        </InteractContext.Provider>
    );
}

export function useInteract() {
    return useContext(InteractContext);
}
