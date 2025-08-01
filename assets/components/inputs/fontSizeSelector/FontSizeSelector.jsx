import { useState } from "react";
import "./fontSizeSelector.scss";

export const FontSizeSelector = () => {
    const [fontSize, setFontSize] = useState(12);

    const fontSizes = [10, 11, 12, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128];

    return (
        <select
            name="select-font-size"
            className="selector"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
        >
            {fontSizes.map(size => (
                <option key={size} value={size}>
                    {size}
                </option>
            ))}
        </select>
    );
};
