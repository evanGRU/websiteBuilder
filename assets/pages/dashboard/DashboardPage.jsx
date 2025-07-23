import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import './dashboardPage.scss';
import {projectStates} from "../../services/params";
import {DeleteIcon, EditIcon, MoreIcon} from "../../services/svg";
import {toast} from "react-toastify";
import api from "../../services/auth/api";
import {AddEditModal} from "../../components/modals/addEditModal/AddEditModal";
import {formatCreatedDate, formatUpdatedDate} from "../../services/formatFunctions";
import OpeningButton from "../../components/buttons/openingButton/OpeningButton";
import {DeleteModal} from "../../components/modals/deleteModal/DeleteModal";
import {useModalManager} from "../../services/useModalManager";

function DashboardPage() {
    const [projectList, setProjectList] = useState([]);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const {
        displayAddEditModal,
        setDisplayAddEditModal,
        displayDeleteModal,
        setDisplayDeleteModal
    } = useModalManager();

    const getProjectList = async () => {
        try {
            const response = await api.get("/projects");
            setProjectList(response.data.member);
        } catch (error) {
            toast.error(error.data)
        }
    }

    useEffect(() => {
        if (!displayDeleteModal){
            getProjectList();
            setProjectToDelete(null);
        }
    }, [displayDeleteModal]);

    const handleEditProject = (project) => {
        setDisplayAddEditModal(true);
        setProjectToEdit(project);
    }

    const handleDeleteProject = (project) => {
        setDisplayDeleteModal(true);
        setProjectToDelete(project.id);
    }

    useEffect(() => {
        if (!displayAddEditModal){
            setProjectToEdit(null);
            getProjectList();
        }
    }, [displayAddEditModal]);

    return (
        <>
            <Navbar/>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="poppins-medium">Mes sites</h1>
                    <div className="dashboard-header-buttons">
                        <button
                            className="button-main"
                            onClick={() => {
                                setDisplayAddEditModal(true);
                            }}
                        >
                            Créer un nouveau site
                        </button>
                    </div>
                </div>
                <table className="dashboard-table">
                    <thead>
                    <tr>
                        <th className="table-column-name">Nom</th>
                        <th className="table-column-default">Dernière modification</th>
                        <th className="table-column-default">Date de création</th>
                        <th className="table-column-default">Créateur</th>
                        <th className="table-column-default">Etat</th>
                        <th className="table-column-actions"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {projectList && projectList.map((project) => (
                        <tr>
                            <td className="table-column-name"><div className="temp-img"></div>{project.name}</td>
                            <td className="table-column-default">{formatUpdatedDate(project.updatedAt)}</td>
                            <td className="table-column-default">{formatCreatedDate(project.createdAt)}</td>
                            <td className="table-column-default">{project.createdBy.fullName}</td>
                            <td className="table-column-default">{projectStates[project.state] ?? ''}</td>
                            <td className="table-column-actions">
                                <OpeningButton
                                    icon={<MoreIcon/>}
                                >
                                    <li>
                                        <button onClick={() => handleEditProject(project)}>
                                            <EditIcon/>
                                            Modifier
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleDeleteProject(project)}>
                                            <DeleteIcon/>
                                            Supprimer
                                        </button>
                                    </li>
                                </OpeningButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {displayAddEditModal && <AddEditModal setDisplayModal={setDisplayAddEditModal} dataToEdit={projectToEdit}/>}
                {displayDeleteModal &&
                    <DeleteModal
                        setDisplayModal={setDisplayDeleteModal}
                        table={'projects'}
                        dataToDelete={projectToDelete}
                    />
                }
            </div>
        </>
    );
}

export default DashboardPage;
