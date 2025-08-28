import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import './authPage.scss';
import Navbar from "../../components/navbar/Navbar";
import api from "../../services/api";
import {toast} from "react-toastify";

function VerifyPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [anErrorOccured, setAnErrorOcurred] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const query = searchParams.toString();
                const response = await api.get(`/verify?${query}`);

                if (response.data.code === "verifiedSuccess") {
                    navigate("/auth");
                    toast.success("Compte validé, vous pouvez vous connecter.")
                } else {
                    setMessage(`Erreur : ${response.data.code}`);
                }
            } catch (error) {
                setMessage("Nous sommes désolé, une erreur est survenue lors de la vérification.");
                setAnErrorOcurred(true);
            }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <>
            <Navbar></Navbar>
            <div className={"verify-container"}>
                {anErrorOccured && (
                    <>
                        <p>{message}</p>
                        <a href="/">Retourner à la page d'accueil</a>
                    </>
                )}
            </div>
        </>
    );
}

export default VerifyPage;
