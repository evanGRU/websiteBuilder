import React, {createContext, useContext, useEffect, useState} from "react";
import {parseFontStyle} from "../functions/globalFunctions";
import api from "../api";
import {toast} from "react-toastify";

const ComponentsManagerContext = createContext();

export function ComponentsManagerProvider({ children, project, setProject }) {
    const [componentToEdit, setComponentToEdit] = useState(null);
    const [hasComponentChanged, setHasComponentChanged] = useState(false);

    const handleChangeComponent = (prop, value) => {
        let styleUpdates = { [prop]: value };

        if (prop === "fontStyle") {
            const [weight, style] = parseFontStyle(value);

            styleUpdates = {
                fontWeight: (weight === "regular" || weight === "italic") ? "400" : weight,
                fontStyle:
                    (weight === "regular" || weight === "italic") ? weight
                        : style ? style : "normal"
            };
        }

        setComponentToEdit(prev => ({
            ...prev,
            styles: prev.styles.map(s =>
                s.property.code in styleUpdates ?
                    {
                        ...s,
                        value: s.property.code === "fontSize" ? styleUpdates[s.property.code] + "px" : styleUpdates[s.property.code]
                    } : s
            )
        }));
    };


    {/* Check if component has changed */}
    useEffect(() => {
        if (!componentToEdit) return;

        const initialComponent = project.components.find(c => c.id === componentToEdit.id);
        const stylesChanged = componentToEdit.styles.some((style, i) => {
            const other = initialComponent.styles[i];
            return style.value !== other.value;
        });

        setHasComponentChanged(stylesChanged);
    }, [componentToEdit]);


    const handleSaveComponentChanges = async () => {
        try {
            const initialComponent = project.components.find(c => c.id === componentToEdit.id);

            const newStyles = componentToEdit.styles.filter(style => {
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
    }


    return (
        <ComponentsManagerContext.Provider value={{
            project,
            setProject,
            componentToEdit,
            setComponentToEdit,
            handleChangeComponent,
            hasComponentChanged,
            handleSaveComponentChanges
        }}>
            {children}
        </ComponentsManagerContext.Provider>
    );
}

export function useComponentsManager() {
    return useContext(ComponentsManagerContext);
}
