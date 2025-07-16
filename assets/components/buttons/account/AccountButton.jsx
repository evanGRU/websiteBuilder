import './accountbutton.scss';
import React, {useEffect, useRef, useState} from "react";
import {AccountIcon} from "../../../services/svg";
import {useAuth} from "../../../services/auth/AuthContext";

export default function AccountButton() {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // 🔹 référence au bouton

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="account-button-wrapper" ref={menuRef}>

            <button
                className={`account-button ${isOpen ? 'account-button-open' : ''}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <AccountIcon />
            </button>

            {isOpen && (
                <ul className={`account-dropdown ${isOpen ? 'account-dropdown-open' : ''}`}>
                    <li><a href="#">Mon compte</a></li>
                    <li><a href="/dashboard">Tableau de bord</a></li>
                    <li><a href="#">Paramètres</a></li>
                    <li>
                        <a href="/auth" onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}>
                            Se déconnecter
                        </a>
                    </li>
                </ul>
            )}
        </div>
    )
}
