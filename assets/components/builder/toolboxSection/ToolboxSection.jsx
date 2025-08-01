import React from 'react';
import './toolboxSection.scss';

const ToolboxSection = ({sectionData}) => {

    return (
        <div className="toolbox-sections">
            <div className="toolbox-header-black"></div>
            <div className="toolbox-sections-content">
                <h2 className="toolbox-section-title">{sectionData.addTitle}</h2>
                <ul>
                    {Object.entries(sectionData.defaultValues).map(([key, value]) => (
                        <li key={key}>
                            {React.createElement(key, { className: "draggable-button-new-component" }, value)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToolboxSection;
