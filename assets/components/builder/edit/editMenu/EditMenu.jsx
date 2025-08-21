import React from 'react';
import './editMenu.scss';
import {FullScreenIcon} from "../../../../services/svg";
import EditSection from "../editSection/EditSection";
import {useComponentsManager} from "../../../../services/contexts/ComponentsManagerContext";

const EditMenu = () => {
    const {project, componentToEdit} = useComponentsManager();

    return (
        <div className={"builder-edit-container"}>
            <div className={"builder-edit-container-header"}>
                <p>{project.name}</p>
                <FullScreenIcon/>
            </div>
            <EditSection componentToEdit={componentToEdit}/>
        </div>
    );
};

export default EditMenu;
