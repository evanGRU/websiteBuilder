import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children, componentToEdit, setComponentToEdit, handleDeleteComponent, hasComponentChanged, handleSaveComponentChanges }) => {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const handleClickOutside = async (event) => {
            const container = document.querySelector(".content-container");
            if (!container || !container.contains(event.target)) return;

            const clickedSelectable = event.target.closest("[data-selectable]");
            if (clickedSelectable) return;

            if (hasComponentChanged) {
                await handleSaveComponentChanges();
            }

            setComponentToEdit(null);
            setIsEditing(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [hasComponentChanged, componentToEdit]);

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
