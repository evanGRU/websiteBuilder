import React from 'react';
import './builderEditBar.scss';
import {DeleteIcon, FontBGColorIcon, FontColorIcon, FontIcon, FontSizeIcon} from "../../../services/svg";
import {FontSizeSelector} from "../../inputs/fontSizeSelector/FontSizeSelector";
import api from "../../../services/auth/api";
import {toast} from "react-toastify";
import {ColorPicker} from "../../inputs/colorPicker/ColorPicker";

const BuilderEditBar = ({componentToEdit, setComponentToEdit, setProjectComponents}) => {

    const handleDeleteComponent = async () => {
        try {
            const response = await api.delete(`/components/delete/${componentToEdit.id}`);
            setProjectComponents(prev =>
                prev.filter(component => component.id !== componentToEdit.id)
            );
            setComponentToEdit(null);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Erreur lors du chargement.");
        }
    }

    return (
        <div className="builder-edit-bar-container">
            <div className="builder-edit-bar">
                {
                    componentToEdit.type === "text" && (
                        <>
                            {/*font*/}
                            {/*fontsize*/}
                            {/*color*/}
                            {/*bg-color*/}
                            {/*text-decoration*/}
                            <div className="edit-bar-inputs-container">
                                <div className="edit-bar-input">
                                    <FontIcon/>
                                    <input type="text" className="font-input"/>
                                </div>

                                <div className="edit-bar-input">
                                    <FontSizeIcon/>
                                    <FontSizeSelector/>
                                </div>

                                <div className="edit-bar-input">
                                    <FontColorIcon/>
                                    <ColorPicker/>
                                </div>

                                <div className="edit-bar-input">
                                    <FontBGColorIcon/>
                                    <ColorPicker/>
                                </div>
                            </div>

                            <div className="edit-bar-buttons-container">
                                <button
                                    className="edit-bar-button"
                                    onClick={handleDeleteComponent}
                                >
                                    <DeleteIcon/>
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default BuilderEditBar;
