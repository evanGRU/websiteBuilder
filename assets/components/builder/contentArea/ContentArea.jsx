import React, {useState} from 'react';
import './contentArea.scss';
import EditableText from "../editableText/EditableText";
import BuilderEditBar from "../builderEditBar/BuilderEditBar";
import {toolboxTexts} from "../../../services/params";

const ContentArea = ({projectComponents, setProjectComponents}) => {
    const [componentToEdit, setComponentToEdit] = useState(null);

    const handleTextChange = (id, newText) => {
        setProjectComponents(prev =>
            prev.map(component => {
                if (component.id === id) {
                    return {
                        ...component,
                        content: {
                            ...component.content,
                            text: newText
                        }
                    }
                } else {
                    return component
                }
            })
        );
    };

    return (
        <div className="builder-content" id="global-dropzone">
            {projectComponents.map((component) => {
                if (component.type === toolboxTexts.menuProperties.text.name) {
                    return (
                        <EditableText
                            key={component.id}
                            textComponent={component}
                            onChange={(newText) => handleTextChange(component.id, newText)}
                            setComponentToEdit={setComponentToEdit}
                        />
                    );
                }
            })}

            {componentToEdit &&
                <BuilderEditBar
                    componentToEdit={componentToEdit}
                    setComponentToEdit={setComponentToEdit}
                    setProjectComponents={setProjectComponents}
                />
            }
        </div>
    );
};

export default ContentArea;
