import './openingbutton.scss';
import React, {useEffect, useRef, useState} from "react";

export default function OpeningButton({ children, icon, title, name}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

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
        <div className="opening-button-wrapper" ref={menuRef}>
            <button
                className={'opening-button'}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {icon}
            </button>

            {isOpen && (
                <div className="opening-button-open-wrapper">
                    <div className="opening-button-dropdown-title">
                        {name !== "accountButton" && icon}
                        {
                            title ? (
                                <p className="poppins-regular">
                                    {title}
                                </p>
                            ) : <></>
                        }
                    </div>
                    <ul className={`opening-button-dropdown ${isOpen ? 'opening-button-dropdown-open' : ''}`}>
                        { children }
                    </ul>
                </div>
            )}
        </div>
    )
}
