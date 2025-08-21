import React, { useState, useRef, useEffect } from 'react';
import './editableText.scss';
import { useGoogleFonts } from '../../../services/contexts/GoogleFontsContext';
import { useSelection } from '../../../services/contexts/SelectionContext';

const EditableText = ({ textComponent, style }) => {
    const [value, setValue] = useState(textComponent.content.value);
    const ref = useRef(null);

    const { loadFontIfNeeded } = useGoogleFonts();
    const {
        componentToEdit,
        setComponentToEdit,
        isEditing,
        setIsEditing,
    } = useSelection();

    const isActive = componentToEdit?.id === textComponent.id;
    const isThisEditing = isEditing && isActive;

    useEffect(() => {
        if (style.fontFamily) {
            loadFontIfNeeded(style);
        }
    }, [loadFontIfNeeded, style]);

    const handleClick = () => {
        if (!isActive) {
            setComponentToEdit(textComponent);
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => setValue(e.target.value);

    if (isThisEditing) {
        return (
            <input
                ref={ref}
                data-selectable
                type="text"
                value={value}
                autoFocus
                onChange={handleChange}
                className="edit-input"
                style={style}
                onFocus={(e) => e.target.select()}
            />
        );
    }

    const Tag = textComponent.content.tag;
    return (
        <Tag
            ref={ref}
            data-selectable
            className={`editable ${isActive ? 'edit-active draggable' : ''}`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            style={style}
        >
            {value}
        </Tag>
    );
};

export default EditableText;
