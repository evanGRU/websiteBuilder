import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../services/api";
import {toast} from "react-toastify";
import "./builderPage.scss";
import Toolbox from "../../components/builder/toolbox/Toolbox";
import ContentArea from "../../components/builder/contentArea/ContentArea";
import {InteractProvider} from "../../services/contexts/InteractContext";
import Loader from "../../components/loader/Loader";
import EditMenu from "../../components/builder/edit/editMenu/EditMenu";
import {GoogleFontsProvider} from "../../services/contexts/GoogleFontsContext";

function BuilderPage() {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [hasProjectLoaded, setHasProjectLoaded] = useState(false);

    const [componentToEdit, setComponentToEdit] = useState(null);


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
        <GoogleFontsProvider>
            <InteractProvider>
                <div className="builder-container">
                    <Toolbox/>

                    <div className="content-container">
                        <ContentArea
                            project={project}
                            setProject={setProject}
                            componentToEdit={componentToEdit}
                            setComponentToEdit={setComponentToEdit}
                        />
                    </div>

                    <EditMenu
                        project={project}
                        setProject={setProject}
                        componentToEdit={componentToEdit}
                    />
                </div>
            </InteractProvider>
        </GoogleFontsProvider>
    ) : <Loader fullScreen={true}/>
}

export default BuilderPage;
