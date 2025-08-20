import React, {createContext, useContext, useEffect, useRef} from "react";
import {componentStyles, defaultComponentStylesValues, toolboxTexts} from "../params";
import api from "../api";
import {toast} from "react-toastify";
import interact from "interactjs";

const NewComponentManagerContext = createContext();

export function NewComponentManagerProvider({ children, setProject }) {
    const componentDataRef = useRef(null);

    const initTextFormData = (event) => {
        const element = event.currentTarget;
        const tagKey = element.dataset.key

        componentDataRef.current = {
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
                        code : 'fontWeight'
                    },
                    value: defaultComponentStylesValues.fontWeight
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
        }
    }

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await api.post('/components/new', componentDataRef.current);
                setProject(prev => (
                    {
                        ...prev,
                        components: [
                            ...prev.components,
                            response.data
                        ]
                    }
                ));
            } catch (e) {
                toast.error('Une erreur s\'est produite.');
            }
        }

        interact('#global-dropzone').dropzone({
            accept: '.new-comp-btn-drag',
            ondrop() {
                handleSubmit();
            }
        });

        return () => {
            interact('#global-dropzone').unset();
        };
    }, []);

    return (
        <NewComponentManagerContext.Provider value={{
            initTextFormData,
        }}>
            {children}
        </NewComponentManagerContext.Provider>
    );
}

export function useNewComponentManager() {
    return useContext(NewComponentManagerContext);
}
