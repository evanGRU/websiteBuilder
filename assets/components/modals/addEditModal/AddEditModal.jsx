import './addEditModal.scss';
import React, {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import api from "../../../services/api";
import {DefaultModalContainer} from "../defaultModalContainer/DefaultModalContainer";
import {projectStates} from "../../../services/params";

const AddEditModal = ({setDisplayModal, dataToEdit}) => {
    const [formData, setFormData] = useState({});
    const isEditModal = useMemo(() => { return !!dataToEdit}, [dataToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditModal) {
                const response = await api.patch(`/projects/${dataToEdit.id}`, formData, {
                    headers: {
                        'Content-Type': 'application/merge-patch+json'
                    }
                });
                toast.success('Votre site a été modifié avec succès.')
            } else {
                const response = await api.post('/projects/new', formData);
                toast.success('Votre site a été créé avec succès.');
            }
            setDisplayModal(false);
        } catch (e) {
            toast.error('Une erreur s\'est produite.');
        }
    }

    const handleChangeForm = (e) => {
        const keyName = e.currentTarget.name;
        const updatedFormData = {
            ...formData,
            [keyName]: e.currentTarget.value
        }
        setFormData(updatedFormData);
    }

    useEffect(() => {
        if (isEditModal) {
            setFormData({...dataToEdit});
        } else {
            setFormData({
                password: false,
                confirmedPassword: false
            });
        }
    }, [dataToEdit]);

    return (
        <DefaultModalContainer
            modalTitle={isEditModal ? 'Modifier un site' : 'Créer un nouveau site'}
            setDisplayModal={setDisplayModal}
        >
            <form className="modal-form">
                <div className="modal-input-container">
                    <input
                        type="text"
                        className="modal-input"
                        name="name"
                        placeholder=""
                        onChange={handleChangeForm}
                        value={formData.name}
                    />
                    <label htmlFor="name" className="modal-label">Nom du site :</label>
                </div>

                {isEditModal && (
                    <div className="modal-select-container">
                        <select
                            name="state"
                            className="modal-select"
                            onChange={handleChangeForm}
                            value={formData.state}
                        >
                            <option value="pending">{projectStates.pending}</option>
                            <option value="finished">{projectStates.finished}</option>
                        </select>
                        <label htmlFor="state" className="modal-label">État du site :</label>
                    </div>
                )}

                <div className="modal-buttons-container">
                    <button
                        className="button-main"
                        onClick={handleSubmit}
                        type="submit"
                    >
                        Confirmer
                    </button>
                    <button
                        className="button-secondary"
                        onClick={() => {setDisplayModal(false);}}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </DefaultModalContainer>
    )
}


export {
    AddEditModal
}
