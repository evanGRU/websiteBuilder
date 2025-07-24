import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../services/auth/api";
import {toast} from "react-toastify";
import "./builderPage.scss";
import {useModalManager} from "../../services/useModalManager";
import {AddEditBuilderModal} from "../../components/modals/addEditBuilderModal/AddEditBuilderModal";
import {componentTypes} from "../../services/params";

function BuilderPage() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    const [projectComponents, setProjectComponents] = useState(null);
    const [hasComponentsLoaded, setHasComponentsLoaded] = useState(false);

    const [componentType, setComponentType] = useState(null);
    const [isToolBoxFolded, setIsToolBoxFolded] = useState(false);

    const {displayAddEditBuilderModal, setDisplayAddEditBuilderModal} = useModalManager();

    const getWebsiteComponents = async () => {
        try {
            const response = await api.get(`/projects/${id}/websiteData`);
            setProjectComponents(response.data);
            setHasComponentsLoaded(true);
        } catch (error) {
            toast.error(error.data);
        }
    }

    useEffect(() => {
        if (!displayAddEditBuilderModal) {
            getWebsiteComponents();
        }
    }, [displayAddEditBuilderModal])

    const getProject = async () => {
        try {
            const response = await api.get(`/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            toast.error(error.data);
        }
    }

    useEffect(() => {
        if (id) {
            getProject();
        }
    }, [id])

    const handleClick = (e) => {
        setComponentType(e.currentTarget.name);
        setDisplayAddEditBuilderModal(true);
    }

    return hasComponentsLoaded ? (
        <>
            <div className="builder-container">
                <div className={`builder-toolbox-container ${isToolBoxFolded ? "toolbox-folded" : ""}`}>
                    <div className="builder-toolbox-header">
                        <a href="/dashboard">Retour</a>
                    </div>
                    <div className="builder-toolbox">
                        <button
                            className="button-secondary"
                            onClick={handleClick}
                            name="bloc"
                        >
                            BLOC
                        </button>
                        <button
                            className="button-secondary"
                            onClick={handleClick}
                            name="text"
                        >
                            TEXT
                        </button>
                    </div>
                </div>
                <div className="builder-content">
                    {
                        projectComponents.map((component) => {
                            if (component.type === componentTypes.text) {
                                if(component.content.tag === 'h1') {
                                    return (
                                        <h1>{component.content.text}</h1>
                                    )
                                } else if (component.content.tag === 'h2') {
                                    return (
                                        <h2>{component.content.text}</h2>
                                    )
                                } else if (component.content.tag === 'p') {
                                    return (
                                        <p>{component.content.text}</p>
                                    )
                                }
                            } else {
                                return <p>Autre component</p>
                            }
                        })
                    }
                </div>
            </div>

            {displayAddEditBuilderModal &&
                <AddEditBuilderModal
                    setDisplayModal={setDisplayAddEditBuilderModal}
                    project={project}
                    componentType={componentType}
                />
            }
        </>
    ) : <h1>Chargement...</h1>
}

export default BuilderPage;
