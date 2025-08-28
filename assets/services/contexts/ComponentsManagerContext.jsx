import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {parseFontStyle} from "../functions/globalFunctions";
import api from "../api";
import {toast} from "react-toastify";

const ComponentsManagerContext = createContext();

export function ComponentsManagerProvider({ children, project, setProject }) {
    const [componentToEdit, setComponentToEdit] = useState(null);
    const [hasComponentChanged, setHasComponentChanged] = useState(false);
    const [isComponentSaving, setIsComponentSaving] = useState(false);

    const componentRef = useRef(componentToEdit);
    useEffect(() => {
        componentRef.current = componentToEdit;
    }, [componentToEdit]);

    const handleChangeComponent = (prop, value) => {
        const stylesPropertyWhoNeedPx = ["fontSize", "left", "top", "width", "height"];
        const currentValue = value !== "" ? value : 0;
        let styleUpdates = {};

        if (Array.isArray(prop)) {
            prop.forEach((p, i) => {
                styleUpdates[p] = Array.isArray(currentValue) ? currentValue[i] : currentValue;
            });
        } else {
            styleUpdates[prop] = currentValue;
        }

        if (prop === "fontStyle") {
            const [weight, style] = parseFontStyle(currentValue);

            styleUpdates = {
                fontWeight: (weight === "regular" || weight === "italic") ? "400" : weight,
                fontStyle: weight === "italic" ? weight
                    : style ? style : "normal"
            };
        }

        setComponentToEdit(prev => {
            const updated = {
                ...prev,
                styles: prev.styles.map(s => {
                    if (styleUpdates.hasOwnProperty(s.property.code)) {
                        let newValue = styleUpdates[s.property.code];

                        if (stylesPropertyWhoNeedPx.includes(s.property.code) && !isNaN(newValue)) {
                            newValue = `${newValue}px`;
                        }

                        return {
                            ...s,
                            value: newValue
                        };
                    }
                    return s;
                })
            };

            componentRef.current = updated;
            return updated;
        });
    };


    useEffect(() => {
        if (!componentToEdit) return;

        const initialComponent = project.components.find(c => c.id === componentToEdit.id);
        const stylesChanged = componentToEdit.styles.some((style, i) => {
            const other = initialComponent.styles[i];
            return style.value !== other.value;
        });

        setHasComponentChanged(stylesChanged);
    }, [componentToEdit, project]);


    const handleSaveComponentChanges = async () => {
        setIsComponentSaving(true);
        try {
            const currentComponentEdited = componentRef.current;
            if (!currentComponentEdited) return;

            const initialComponent = project.components.find(c => c.id === currentComponentEdited.id);
            if (!initialComponent) return;

            const newStyles = currentComponentEdited.styles.filter(style => {
                const initialStyle = initialComponent.styles.find(s => s.id === style.id);
                return initialStyle && initialStyle.value !== style.value;
            });

            if (newStyles.length === 0) {
                setHasComponentChanged(false);
                return;
            }

            const updatedStyles = await Promise.all(
                newStyles.map(s =>
                    api.patch(
                        `/styles/${s.id}`,
                        { value: s.value },
                        { headers: { "Content-Type": "application/merge-patch+json" } }
                    ).then(r => r.data)
                )
            );

            setProject(prev => ({
                ...prev,
                components: prev.components.map(component =>
                    component.id === initialComponent.id ?
                        {
                            ...component,
                            styles: component.styles.map(s => {
                                const updated = updatedStyles.find(us => us.id === s.id);
                                return updated ? updated : s;
                            }),
                        }
                        : component
                ),
            }));
        } catch (e) {
            toast.error('Une erreur s\'est produite.');
        }
        setHasComponentChanged(false);
        setIsComponentSaving(false);
    }

    const handleSaveText = async () => {
        try {
            const currentComponentEdited = componentRef.current;
            if (!currentComponentEdited) return;

            const initialComponent = project.components.find(c => c.id === componentToEdit.id);
            if (!initialComponent) return;

            if (currentComponentEdited.content.value === initialComponent.content.value) {
                return;
            }

            const response = await api.patch(
                `/components/${currentComponentEdited.id}/update`,
                { value: currentComponentEdited.content.value },
                { headers: { "Content-Type": "application/merge-patch+json" } }
            ).then(r => r.data);

            setProject(prev => ({
                ...prev,
                components: prev.components.map(component =>
                    component.id === initialComponent.id ?
                        {
                            ...component,
                            content: {
                                ...component.content,
                                value: currentComponentEdited.content.value
                            }
                        }
                        : component
                ),
            }));
        } catch (e) {
            toast.error('Une erreur s\'est produite.');
        }
    }


    return (
        <ComponentsManagerContext.Provider value={{
            project,
            setProject,
            componentToEdit,
            setComponentToEdit,
            componentRef,
            handleChangeComponent,
            hasComponentChanged,
            handleSaveComponentChanges,
            isComponentSaving,
            handleSaveText
        }}>
            {children}
        </ComponentsManagerContext.Provider>
    );
}

export function useComponentsManager() {
    return useContext(ComponentsManagerContext);
}
