import React, {useEffect, useRef, useState} from 'react';
import './toolbox.scss';
import {BackIcon} from "../../../services/svg";
import ToolboxMenu from "../toolboxMenu/ToolboxMenu";
import ToolboxSection from "../toolboxSection/ToolboxSection";
import {toolboxTexts} from "../../../services/params";

const Toolbox = () => {
    const [sectionData, setSectionData] = useState(null);
    const ref = useRef(null);

    const handleClick = (e) => {
        const clickedMenuItem = toolboxTexts.menuProperties[e.currentTarget.name];
        const isSameItem = sectionData?.name === clickedMenuItem.name;

        if (!sectionData || isSameItem) {
            setSectionData(isSameItem ? null : clickedMenuItem);
        } else {
            setSectionData(clickedMenuItem);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setSectionData(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={"toolbox-container"} ref={ref}>
            <div className="toolbox-header">
                <a href="/dashboard"><BackIcon/></a>
            </div>

            <ToolboxMenu
                onClick={handleClick}
                sectionData={sectionData}
            />

            <ToolboxSection
                sectionData={sectionData}
                setSectionData={setSectionData}
            />
        </div>
    );
};

export default Toolbox;
