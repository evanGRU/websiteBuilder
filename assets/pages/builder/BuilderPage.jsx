import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../services/api";
import {toast} from "react-toastify";
import "./builderPage.scss";
import Toolbox from "../../components/builder/toolbox/Toolbox";
import ContentArea from "../../components/builder/contentArea/ContentArea";
import {NewComponentManagerProvider} from "../../services/contexts/NewComponentManagerContext";
import Loader from "../../components/loader/Loader";
import EditMenu from "../../components/builder/edit/editMenu/EditMenu";
import {GoogleFontsProvider} from "../../services/contexts/GoogleFontsContext";
import {ComponentsManagerProvider} from "../../services/contexts/ComponentsManagerContext";

function BuilderPage() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [hasProjectLoaded, setHasProjectLoaded] = useState(false);

    useEffect(() => {
        if (!id) return;
        localStorage.setItem("projectId", id);

        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data);
                setHasProjectLoaded(true);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Erreur lors du chargement.");
            }
        };
        fetchProject();
    }, [id]);


    return hasProjectLoaded ? (
        <ComponentsManagerProvider project={project} setProject={setProject}>
            <GoogleFontsProvider>
                <NewComponentManagerProvider setProject={setProject}>
                    <div className="builder-container">
                        <Toolbox/>

                        <div className="content-container">
                            <ContentArea/>
                        </div>

                        <EditMenu/>
                    </div>
                </NewComponentManagerProvider>
            </GoogleFontsProvider>
        </ComponentsManagerProvider>
    ) : <Loader fullScreen={true}/>
}

export default BuilderPage;
