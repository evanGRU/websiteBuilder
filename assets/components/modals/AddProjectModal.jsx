import './addprojectmodal.scss';
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {CloseIcon} from "../../services/svg";
import api from "../../services/auth/api";

const AddProjectModal = ({setDisplayModal}) => {
    const [formData, setFormData] = useState({});
    const handleSubmit = async (e) => {
        try {
            const response = await api.post('/projects/new', (formData))
            toast.success('Projet créé avec succès')
            setDisplayModal(false);
        } catch (e) {
            toast.error('Une erreur s\'est produite');
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
        setFormData({
            password: false,
            confirmedPassword: false
        });
    }, []);

    return (
        <div className="modal-background">
            <div className="modal">
                <div className="modal-header">
                    <p>Créer un nouveau site</p>
                    <button onClick={() => {
                        setDisplayModal(false);
                    }}>
                        <CloseIcon/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-input-container">
                        <input
                            type="text"
                            className="modal-input"
                            name="name"
                            placeholder=""
                            onChange={handleChangeForm}
                        />
                        <label htmlFor="name" className="modal-label">Nom du site :</label>
                    </div>

                    <button className="button-main">
                        Confirmer
                    </button>
                </form>
            </div>
        </div>
    )
}


export {
    AddProjectModal
}
