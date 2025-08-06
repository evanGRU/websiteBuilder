import React, { useState, useRef } from 'react';
import './editableText.scss';
import {useClickOutsideHandler} from "../../../services/functions/globalFunctions";

const EditableText = ({ textComponent, setComponentToEdit, style }) => {
    const [isEditActive, setIsEditActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useState(textComponent.content.value);
    const ref = useRef(null);

    useClickOutsideHandler({
        ref,
        settersArray: [
            { setFunction: setIsEditActive, defaultValue: false },
            { setFunction: setIsEditing, defaultValue: false },
            { setFunction: setComponentToEdit, defaultValue: null },
        ],
        condition: isEditActive || isEditing,
    })

    const handleClick = () => {
        !isEditActive && setIsEditActive(true);
        setComponentToEdit(textComponent);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => setValue(e.target.value);

    if (isEditing) {
        return (
            <input
                ref={ref}
                type="text"
                value={value}
                autoFocus
                onChange={handleChange}
                className="edit-input"
            />
        );
    }

    const Tag = textComponent.content.tag;
    return (
        <Tag
            ref={ref}
            className={`editable ${isEditActive ? "edit-active draggable" : ""}`}
            onDoubleClick={handleDoubleClick}
            onClick={handleClick}
            style={style}
        >
            {value}
        </Tag>
    );
};

export default EditableText;
