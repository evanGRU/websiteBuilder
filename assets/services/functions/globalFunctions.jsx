import {defaultComponentStylesValues} from "../params";

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
            fontStyle: stylesMap.fontStyle || defaultComponentStylesValues.fontStyle,
            fontWeight: stylesMap.fontWeight || defaultComponentStylesValues.fontWeight,
            fontSize: stylesMap.fontSize ? parseInt(stylesMap.fontSize, 10) : defaultComponentStylesValues.fontSize,
            textAlign: stylesMap.textAlign || defaultComponentStylesValues.textAlign
        },
        color: stylesMap.color || defaultComponentStylesValues.color,
        backgroundColor: stylesMap.backgroundColor || defaultComponentStylesValues.backgroundColor,
        left: stylesMap.left,
        top: stylesMap.top,
        position: stylesMap.position || defaultComponentStylesValues.position
    };
}

export const parseFontStyle = (str) => {
    const match = str.match(/^(\d+)([a-zA-Z]+)$/);
    return match ? [match[1], match[2]] : [str, ""];
};
