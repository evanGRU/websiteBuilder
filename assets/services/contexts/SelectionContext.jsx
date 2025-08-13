// SelectionContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children, componentToEdit, setComponentToEdit, handleDeleteComponent }) => {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.querySelector('.content-container');

            if (!container || !container.contains(event.target)) {
                return;
            }

            const clickedSelectable = event.target.closest('[data-selectable]');
            if (!clickedSelectable) {
                setComponentToEdit(null);
                setIsEditing(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsEditing(false);
            }
            if (event.key === 'Enter' && isEditing) {
                setIsEditing(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isEditing]);

    useEffect(() => {
        if (isEditing) return;
        const handleKeyDown = (e) => {
            if (e.key === "Delete" || e.key === "Backspace" || e.keyCode === 46) {
                handleDeleteComponent(componentToEdit);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [componentToEdit, isEditing]);

    return (
        <SelectionContext.Provider
            value={{
                componentToEdit,
                setComponentToEdit,
                isEditing,
                setIsEditing,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelection = () => useContext(SelectionContext);
