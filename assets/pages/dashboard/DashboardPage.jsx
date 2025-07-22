import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import './dashboardPage.scss';
import {projectStates} from "../../services/params";
import {DeleteIcon, EditIcon, MoreIcon} from "../../services/svg";
import {toast} from "react-toastify";
import api from "../../services/auth/api";
import {AddProjectModal} from "../../components/modals/AddProjectModal";
import {formatCreatedDate, formatUpdatedDate} from "../../services/formatFunctions";
import OpeningButton from "../../components/buttons/openingButton/OpeningButton";

function DashboardPage() {
    const [projectList, setProjectList] = useState([]);
    const [displayAddProjectModal, setDisplayAddProjectModal] = useState(false);

    const getProjectList = async () => {
        try {
            const response = await api.get("/projects");
            setProjectList(response.data.member);
        } catch (error) {
            toast.error(error.data)
        }
    }

    useEffect(() => {
        getProjectList()
    }, []);

    return (
        <>
            <Navbar/>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="poppins-medium">Sites créés</h1>
                    <div className="dashboard-header-buttons">
                        <button
                            className="button-main"
                            onClick={() => {
                                setDisplayAddProjectModal(true);
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
                                <button className="button-secondary">
                                    <MoreIcon/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {
                    displayAddProjectModal && <AddProjectModal setDisplayModal={setDisplayAddProjectModal}/>
                }
            </div>
        </>
    );
}

export default DashboardPage;
