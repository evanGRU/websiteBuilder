import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import './colorPicker.scss';

export const ColorPicker = () => {
    const [color, setColor] = useState("#ef58d7");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    return (
        <div className="color-picker-container">
            <div className="color-picker-input">
                <input type="text" value={color} onChange={e => setColor(e.target.value)} />
                <button
                    style={{ backgroundColor: color }}
                    onClick={() => {setDisplayColorPicker(!displayColorPicker)}}
                ></button>
            </div>

            {displayColorPicker && <HexColorPicker color={color} onChange={setColor} className="color-picker"/>}
        </div>
    );
};
