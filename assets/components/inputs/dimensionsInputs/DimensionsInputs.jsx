import React from 'react';
import './dimensionsInputs.scss';

const DimensionsInputs = () => {
    return (
        <div className={"dimensions-container"}>
            <div className={"dimensions-inputs-container"}>
                <div className={"dimensions-input"}>
                    <p>W</p>
                    <input type="text" name="width"/>
                </div>
                <div className={"dimensions-input"}>
                    <p>H</p>
                    <input type="text" name="height"/>
                </div>
            </div>
            <button>L</button>
        </div>
    );
};

export default DimensionsInputs;
