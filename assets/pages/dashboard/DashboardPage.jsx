import React  from "react";
import Navbar from "../../components/navbar/Navbar";
import {toast} from "react-toastify";

function DashboardPage() {
    return (
        <>
            <Navbar/>
            <h1>Dashboard</h1>

            <button
                onClick={() => {
                    toast.success('c\'est un test');
                    toast.error('c\'est un test');
                    toast('c\'est un test');
                }}
            >Clique</button>
        </>
    );
}

export default DashboardPage;
