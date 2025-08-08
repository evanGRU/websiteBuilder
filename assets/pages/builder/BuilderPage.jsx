import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../services/api";
import {toast} from "react-toastify";
import "./builderPage.scss";
import Toolbox from "../../components/builder/toolbox/Toolbox";
import ContentArea from "../../components/builder/contentArea/ContentArea";
import {InteractProvider} from "../../services/contexts/InteractContext";
import Loader from "../../components/loader/Loader";

function BuilderPage() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [hasComponentsLoaded, setHasComponentsLoaded] = useState(false);

    useEffect(() => {
        if (!id) return;
        localStorage.setItem("projectId", id);

        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data);
                setTimeout(() => setHasComponentsLoaded(true), 500);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Erreur lors du chargement.");
            }
        };
        fetchProject();
    }, [id]);

    return hasComponentsLoaded ? (
        <InteractProvider>
            <div className="builder-container">
                <Toolbox/>

                <ContentArea
                    project={project}
                    setProject={setProject}
                />
            </div>
        </InteractProvider>
    ) : <Loader fullScreen={true}/>
}

export default BuilderPage;
