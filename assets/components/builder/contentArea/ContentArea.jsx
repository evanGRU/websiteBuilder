import React, {useEffect, useRef, useState} from 'react';
import './contentArea.scss';
import EditableText from "../editableText/EditableText";
import BuilderEditBar from "../builderEditBar/BuilderEditBar";
import {toolboxTexts} from "../../../services/params";
import interact from "interactjs";
import {useInteract} from "../../../services/contexts/InteractContext";
import {toast} from "react-toastify";
import api from "../../../services/api";

const ContentArea = ({project, setProject}) => {
    const [componentToEdit, setComponentToEdit] = useState(null);

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
                            componentDataRef.current
                        ]
                    }
                ));
                toast.success('Votre composant a été créé avec succès.');
            } catch (e) {
                toast.error('Une erreur s\'est produite.');
            }
        }

        interact('#global-dropzone').dropzone({
            accept: '.new-comp-btn-drag',
            ondrop(event) {
                handleSubmit();
            }
        });

        return () => {
            interact('#global-dropzone').unset();
        };
    }, []);

    const getStyles = (stylesArray) => {
        return stylesArray.reduce((result, style) => {
            result[style.property.code] = style.value;
            return result;
        }, {});
    }

    return (
        <div className="builder-content" id="global-dropzone">
            {project.components.map((component) => {
                if (component.type === toolboxTexts.menuProperties.text.name) {
                    const inlineStyles = getStyles(component.styles);
                    return (
                        <EditableText
                            key={component.id}
                            textComponent={component}
                            onChange={(newText) => handleTextChange(component.id, newText)}
                            setComponentToEdit={setComponentToEdit}
                            style={inlineStyles}
                        />
                    );
                }
            })}

            {componentToEdit &&
                <BuilderEditBar
                    componentToEdit={componentToEdit}
                    setComponentToEdit={setComponentToEdit}
                    project={project}
                    setProject={setProject}
                />
            }
        </div>
    );
};

export default ContentArea;
