import React from 'react';
import './contentArea.scss';
import EditableText from "../editableText/EditableText";
import {toolboxTexts} from "../../../services/params";
import {toast} from "react-toastify";
import api from "../../../services/api";
import {transformArrayToObject} from "../../../services/functions/globalFunctions";
import {SelectionProvider} from "../../../services/contexts/SelectionContext";
import {DragComponentProvider} from "../../../services/contexts/DragComponentContext";
import {useComponentsManager} from "../../../services/contexts/ComponentsManagerContext";

const ContentArea = () => {

    const {
        project,
        setProject,
        componentToEdit,
        setComponentToEdit,
        hasComponentChanged,
        handleSaveComponentChanges
    } = useComponentsManager();

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
            <DragComponentProvider>
                <SelectionProvider
                    project={project}
                    componentToEdit={componentToEdit}
                    setComponentToEdit={setComponentToEdit}
                    handleDeleteComponent={handleDeleteComponent}
                    hasComponentChanged={hasComponentChanged}
                    handleSaveComponentChanges={handleSaveComponentChanges}
                >
                    {project.components.map((component) => {
                        if (component.type === toolboxTexts.menuProperties.text.name) {
                            const componentToTransform =
                                componentToEdit && componentToEdit.id === component.id ? componentToEdit.styles : component.styles;
                            const inlineStyles = transformArrayToObject(componentToTransform, ['property', 'code'], 'value');

                            return (
                                <EditableText
                                    key={component.id}
                                    textComponent={component}
                                    style={inlineStyles}
                                />
                            );
                        }
                    })}
                </SelectionProvider>
            </DragComponentProvider>
        </div>
    );
};

export default ContentArea;
