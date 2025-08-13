import { useEffect } from "react";
import {defaultComponentStylesValues} from "../params";

export const useClickOutsideHandler = ({ref, settersArray = [], condition = true}) => {
    useEffect(() => {
        if (!condition) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && !event.target.closest('.builder-edit-bar')) {
                settersArray.forEach((setter) => {
                    setter.setFunction(setter.defaultValue);
                });
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, settersArray, condition]);
};

export const transformArrayToObject = (array, keys, valueKey) => {
    return array.reduce((result, item) => {
        const nestedKey = keys.reduce((obj, key) => obj?.[key], item);
        if (nestedKey !== undefined) {
            result[nestedKey] = item[valueKey];
        }
        return result;
    }, {});
};

export const formatComponentStyle = (component) => {
    const stylesMap = {};

    component.styles.forEach(style => {
        stylesMap[style.property.code] = style.value;
    });

    return {
        font: {
            family: stylesMap.fontFamily || defaultComponentStylesValues.fontFamily,
            style: stylesMap.fontStyle || defaultComponentStylesValues.fontStyle,
            size: stylesMap.fontSize ? parseInt(stylesMap.fontSize, 10) : defaultComponentStylesValues.fontSize,
            textAlign: stylesMap.textAlign || defaultComponentStylesValues.textAlign
        },
        color: stylesMap.color || defaultComponentStylesValues.color,
        backgroundColor: stylesMap.backgroundColor || defaultComponentStylesValues.backgroundColor
    };
}
