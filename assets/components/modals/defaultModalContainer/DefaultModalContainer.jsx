import './defaultModalContainer.scss';
import React from "react";
import {CloseIcon} from "../../../services/svg";

const DefaultModalContainer = ({children, modalTitle, setDisplayModal}) => {
    return (
        <div className="modal-background">
            <div className="modal">
                <div className="modal-header">
                    <p>{modalTitle}</p>
                    <button onClick={() => {
                        setDisplayModal(false);
                    }}>
                        <CloseIcon/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}


export {
    DefaultModalContainer
}
