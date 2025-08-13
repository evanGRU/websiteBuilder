import React, {useEffect, useRef} from 'react';
import './contentArea.scss';
import EditableText from "../editableText/EditableText";
import {toolboxTexts} from "../../../services/params";
import interact from "interactjs";
import {useInteract} from "../../../services/contexts/InteractContext";
import {toast} from "react-toastify";
import api from "../../../services/api";
import {transformArrayToObject} from "../../../services/functions/globalFunctions";
import {SelectionProvider} from "../../../services/contexts/SelectionContext";

const ContentArea = ({project, setProject, componentToEdit, setComponentToEdit}) => {
    const { componentDataToAdd } = useInteract();
    const componentDataRef = useRef(componentDataToAdd);

    useEffect(() => {
        componentDataRef.current = componentDataToAdd;
    }, [componentDataToAdd]);

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

    const handleDeleteComponent = async (componentToEdit) => {
        try {
            const response = await api.delete(`/components/delete/${componentToEdit.id}`);
            setProject(prev => ({
                ...prev,
                components: prev.components.filter(
                    component => component.id !== componentToEdit.id
                )
            }));
            setComponentToEdit(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Erreur lors du chargement.");
        }
    }

    return (
        <div className="builder-content" id="global-dropzone">
            <SelectionProvider
                componentToEdit={componentToEdit}
                setComponentToEdit={setComponentToEdit}
                handleDeleteComponent={handleDeleteComponent}
            >
                {project.components.map((component) => {
                    if (component.type === toolboxTexts.menuProperties.text.name) {
                        const inlineStyles = transformArrayToObject(component.styles, ['property', 'code'], 'value');
                        return (
                            <EditableText
                                key={component.id}
                                textComponent={component}
                                // onChange={(newText) => handleTextChange(component.id, newText)}
                                style={inlineStyles}
                            />
                        );
                    }
                })}
            </SelectionProvider>
        </div>
    );
};

export default ContentArea;
