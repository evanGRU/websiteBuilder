import React, {createContext, useContext, useState} from "react";
import {componentStyles, toolboxTexts} from "../params";

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
                        code : 'fontSize'
                    },
                    value: componentStyles.fontSize[tagKey]
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
