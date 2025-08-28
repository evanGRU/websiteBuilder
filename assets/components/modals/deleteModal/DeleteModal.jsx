import './deleteModal.scss';
import React from "react";
import {toast} from "react-toastify";
import api from "../../../services/api";
import {DefaultModalContainer} from "../defaultModalContainer/DefaultModalContainer";

const DeleteModal = ({setDisplayModal, dataToDelete}) => {
    const handleSubmit = async () => {
        try {
            const response = await api.delete(`/projects/${dataToDelete}`);
            toast.success('Votre site vient d\'être supprimé.');
            setDisplayModal(false);
        } catch (e) {
            toast.error('Une erreur s\'est produite.');
        }
    }

    return (
        <DefaultModalContainer modalTitle={'Supprimer un site'} setDisplayModal={setDisplayModal}>
            <div className="modal-content">
                <h1>Êtes-vous sûr de vouloir supprimer ce site?</h1>
                <div className="modal-content-button-container">
                    <button
                        className="button-main modal-button-delete"
                        onClick={handleSubmit}
                    >
                        Supprimer
                    </button>
                    <button
                        className="button-secondary"
                        onClick={() => {setDisplayModal(false);}}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </DefaultModalContainer>
    )
}


export {
    DeleteModal
}
