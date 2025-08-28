import React, {createContext, useContext, useEffect, useRef} from "react";
import {componentStyles, defaultComponentStylesValues, toolboxTexts} from "../params";
import api from "../api";
import {toast} from "react-toastify";
import interact from "interactjs";
import {useComponentsManager} from "./ComponentsManagerContext";

const NewComponentManagerContext = createContext();

export function NewComponentManagerProvider({ children, setProject }) {
    const componentDataRef = useRef(null);
    const {componentRef, handleChangeComponent, handleSaveComponentChanges} = useComponentsManager();
    const position = useRef({ x: 0, y: 0 });

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
                },
                {
                    property: {
                        code : 'width'
                    },
                    value: toolboxTexts.menuProperties.text.defaultValues[tagKey].length + "ch"
                }
            ]
        }
    }

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                if (componentRef.current) {
                    handleSaveComponentChanges();
                } else {
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
                    componentDataRef.current = null;
                }
            } catch (e) {
                toast.error('Une erreur s\'est produite.');
            }
        }

        interact('.draggable').draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({ x: 10, y: 10 })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                })
            ],
            listeners: {
                move(event) {
                    position.current.x += event.dx;
                    position.current.y += event.dy;
                    event.target.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
                },
                end(event) {
                    position.current.x = 0;
                    position.current.y = 0;
                    event.target.style.transform = `translate(0px, 0px)`;
                },
            },
        });

        interact('#global-dropzone').dropzone({
            accept: '.new-comp-btn-drag, .draggable',
            ondrop(event) {
                const dropzone = event.target;
                const draggable = event.relatedTarget;

                const dropRect = dropzone.getBoundingClientRect();
                const dragRect = draggable.getBoundingClientRect();

                const xPos = (dragRect.left - dropRect.left) + 'px';
                const yPos = (dragRect.top - dropRect.top) + 'px';

                if (componentRef.current) {
                    handleChangeComponent(['left', 'top'], [xPos, yPos]);
                } else {
                    componentDataRef.current = {
                        ...componentDataRef.current,
                        styles: [
                            ...componentDataRef.current.styles,
                            {
                                property: {
                                    code : 'position'
                                },
                                value: defaultComponentStylesValues.position
                            },
                            {
                                property: {
                                    code : 'left'
                                },
                                value: xPos
                            },
                            {
                                property: {
                                    code : 'top'
                                },
                                value: yPos
                            },
                        ]
                    }
                }

                handleSubmit();
            }
        });

        return () => {
            interact('#global-dropzone').unset();
            interact('.draggable').unset();
        };
    }, [handleChangeComponent, handleSaveComponentChanges, setProject]);

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
