import {AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon} from "./svg";
import React from "react";

export const authMethod = {
    login: 'login',
    register: 'register'
}

export const projectStates = {
    pending: 'En cours',
    finished: 'Terminé'
}

export const toolboxTexts = {
    menuProperties: {
        bloc: {
            name: "bloc",
            addTitle: "Ajouter un bloc",
            defaultValues: {
            }
        },
        text: {
            name: "text",
            addTitle: "Ajouter un texte",
            defaultValues: {
                h1: "Titre",
                h2: "Sous-titre",
                p: "Paragraphe"
            }
        },
        button: {
            name: "button",
            addTitle: "Ajouter un bouton",
            defaultValues: {
            }
        },
        image: {
            name: "image",
            addTitle: "Ajouter une image",
            defaultValues: {
            }
        },
    },
}

export const componentStyles = {
    fontSize: {
        h1: '32px',
        h2: '24px',
        p: '16px'
    }
}

export const defaultComponentStylesValues = {
    fontFamily: 'Inter',
    fontStyle: 'regular',
    fontSize: '12',
    textAlign: 'left',
    color: "#000000",
    backgroundColor: "transparent"
}

export const fontSizeDefaultValues = [10, 11, 12, 13, 14, 15, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128];

export const fontStyleValues = {
    regular: 'Regular',
    100: 'Thin',
    200: 'Extra Light',
    300: 'Light',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold',
    800: 'Extra Bold',
    900: 'Black',
    italic: 'Italic',
    '100italic': 'Thin Italic',
    '200italic': 'Extra Light Italic',
    '300italic': 'Light Italic',
    '500italic': 'Medium Italic',
    '600italic': 'Semi Bold Italic',
    '700italic': 'Bold Italic',
    '800italic': 'Extra Bold Italic',
    '900italic': 'Black Italic',
}

export const selectorTypes = {
    style: 'style',
    size: 'size'
}

export const alignObjects = [
    {
        code: 'left',
        icon: <AlignLeftIcon/>
    },
    {
        code: 'center',
        icon: <AlignCenterIcon/>
    },
    {
        code: 'right',
        icon: <AlignRightIcon/>
    },
    {
        code: 'justify',
        icon: <AlignJustifyIcon/>
    }
]

export const componentTypes = {
    text: 'text'
}

export const GOOGLE_API_KEY = "AIzaSyDn_gYG1xpZevxu0a_HRyryrf6DdW_Wh9I";
