import { useEffect } from "react";

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
            family: stylesMap.fontFamily || "Inter",
            style: stylesMap.fontStyle || "regular",
            size: stylesMap.fontSize ? parseInt(stylesMap.fontSize, 10) : 12,
            textAlign: stylesMap.textAlign || "left"
        },
        color: stylesMap.color || "#000000",
        backgroundColor: stylesMap.backgroundColor || "transparent"
    };
}
