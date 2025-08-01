import React, {useRef, useState} from 'react';
import './toolbox.scss';
import {BackIcon} from "../../../services/svg";
import ToolboxMenu from "../toolboxMenu/ToolboxMenu";
import ToolboxSection from "../toolboxSection/ToolboxSection";
import {toolboxTexts} from "../../../services/params";
import {useClickOutsideHandler} from "../../../services/functions/globalFunctions";

const Toolbox = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sectionData, setSectionData] = useState(null);
    const ref = useRef(null);

    const handleClick = (e) => {
        const clickedMenuItem = toolboxTexts.menuProperties[e.currentTarget.name];
        const isSameItem = sectionData?.name === clickedMenuItem.name;

        if (!sectionData || isSameItem) {
            setIsMenuOpen((prev) => !prev);
            setSectionData(isSameItem ? null : clickedMenuItem);
        } else {
            setSectionData(clickedMenuItem);
        }
    };

    useClickOutsideHandler({
        ref,
        settersArray: [
            { setFunction: setIsMenuOpen, defaultValue: false },
            { setFunction: setSectionData, defaultValue: null },
        ],
        condition: isMenuOpen || sectionData,
    });


    return (
        <div className={"toolbox-container"} ref={ref}>
            <div className="toolbox-header">
                <a href="/dashboard"><BackIcon/></a>
            </div>

            <ToolboxMenu
                onClick={handleClick}
                sectionData={sectionData}
            />

            {isMenuOpen && (
                <ToolboxSection
                    sectionData={sectionData}
                />
            )}
        </div>
    );
};

export default Toolbox;
