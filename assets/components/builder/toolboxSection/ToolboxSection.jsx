import React, { useEffect, useRef, useState } from "react";
import "./toolboxSection.scss";
import interact from "interactjs";
import {useInteract} from "../../../services/contexts/InteractContext";

const ToolboxSection = ({ sectionData, setSectionData }) => {
    const followerRef = useRef(null);
    const position = useRef({ x: 0, y: 0 });
    const [isDragActive, setIsDragActive] = useState(false);
    const {initTextFormData} = useInteract();

    useEffect(() => {
        interact('.new-comp-btn-drag').draggable({
            listeners: {
                start(event) {
                    initTextFormData(event);
                    setIsDragActive(true);
                },
                move(event) {
                    position.current.x += event.dx;
                    position.current.y += event.dy;
                    event.target.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
                },
                end(event) {
                    position.current.x = 0;
                    position.current.y = 0;
                    event.target.style.transform = `translate(0px, 0px)`;

                    setIsDragActive(false);
                    setSectionData(null);
                },
            },
        });

        return () => {
            interact('.new-comp-btn-drag').unset();
        };
    }, []);

    return (
        <div className={`toolbox-sections ${!sectionData || isDragActive ? 'hide-toolbox': 'show-toolbox'}`}>
            <div className="toolbox-header-black"></div>
            {sectionData && (
                <div className="toolbox-sections-content">
                    <h2 className="toolbox-section-title">{sectionData.addTitle}</h2>
                    <ul>
                        {Object.entries(sectionData.defaultValues).map(([key, value]) => (
                            <li key={key}>
                                {React.createElement(key, { className: "new-comp-btn-bg" }, value)}
                                <div
                                    ref={followerRef}
                                    className="new-comp-btn-drag"
                                    data-key={key}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ToolboxSection;
