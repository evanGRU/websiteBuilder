import './addEditBuilderModal.scss';
import React, {useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import api from "../../../services/auth/api";
import {DefaultModalContainer} from "../defaultModalContainer/DefaultModalContainer";
import {textOptions} from "../../../services/params";

const AddEditBuilderModal = ({setDisplayModal, project, componentType}) => {
    const [formData, setFormData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/components/new', formData);
            toast.success('Votre composant a été créé avec succès.');
            setDisplayModal(false);
        } catch (e) {
            toast.error('Une erreur s\'est produite.');
        }
    }

    const handleChangeForm = (e) => {
        const keyName = e.currentTarget.name;
        const updatedFormData = {
            ...formData,
            "component": {
                ...formData.component,
                [keyName]: e.currentTarget.value
            }
        }
        setFormData(updatedFormData);
    }

    useEffect(() => {
        setFormData({
            "projectId": project?.id,
            "component": {
                "type": componentType,
                "tag": "",
                "text": ""
            }
        })
    }, [project, componentType]);

    return (
        <DefaultModalContainer
            modalTitle={'Ajouter un composant texte'}
            setDisplayModal={setDisplayModal}
        >
            <form className="modal-form">
                <div className="modal-select-container">
                    <select
                        name="tag"
                        className="modal-select"
                        onChange={handleChangeForm}
                        value={formData?.component?.tag}
                    >
                        {
                            textOptions.map((option) => {
                                return <option value={option.value}>{option.text}</option>;
                            })
                        }
                    </select>
                </div>

                <div className="modal-input-container">
                    <input
                        type="text"
                        className="modal-input"
                        name="text"
                        placeholder=""
                        onChange={handleChangeForm}
                        value={formData?.component?.text}
                    />
                    <label htmlFor="text" className="modal-label">Votre texte :</label>
                </div>

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
    AddEditBuilderModal
}
