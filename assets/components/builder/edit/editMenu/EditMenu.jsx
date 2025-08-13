import React from 'react';
import './editMenu.scss';
import {MoreIcon} from "../../../../services/svg";
import EditSection from "../editSection/EditSection";

const EditMenu = ({project, setProject, componentToEdit}) => {

    return (
        <div className={"builder-edit-container"}>
            <div className={"builder-edit-container-header"}>
                <p>{project.name}</p>
                <MoreIcon/>
            </div>
            <EditSection componentToEdit={componentToEdit}/>
        </div>
    );
};

export default EditMenu;
