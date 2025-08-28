import './editDefaultModal.scss';
import React from "react";
import {CloseIcon} from "../../../services/svg";

const EditDefaultModal = ({children, onClose, title}) => {
    return (
        <div className={"edit-modal-container"}>
            <div className={"edit-modal-header"}>
                <p>{title}</p>
                <button onClick={onClose}>
                    <CloseIcon/>
                </button>
            </div>
            <div className={"edit-modal-content"}>
                {children}
            </div>
        </div>
    )
}


export default EditDefaultModal;
