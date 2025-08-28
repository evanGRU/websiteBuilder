import { useState } from "react";

export const useModalManager = () => {
    const [displayAddEditModal, setDisplayAddEditModal] = useState(false);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
    const [displayAddEditBuilderModal, setDisplayAddEditBuilderModal] = useState(false);

    return {
        displayAddEditModal,
        setDisplayAddEditModal,
        displayDeleteModal,
        setDisplayDeleteModal,
        displayAddEditBuilderModal,
        setDisplayAddEditBuilderModal
    };
};
