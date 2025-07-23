import { useState } from "react";

export const useModalManager = () => {
    const [displayAddEditModal, setDisplayAddEditModal] = useState(false);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

    return {
        displayAddEditModal,
        setDisplayAddEditModal,
        displayDeleteModal,
        setDisplayDeleteModal
    };
};
