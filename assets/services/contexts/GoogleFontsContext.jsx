import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import WebFont from "webfontloader";
import {GOOGLE_API_KEY} from "../params";

const GoogleFontsContext = createContext(null);

export function GoogleFontsProvider({ children }) {
    const fontsListRef = useRef([]);
    const loadedFonts = useRef(new Set());
    const [fontsAreLoading, setFontsAreLoading] = useState(true);

    useEffect(() => {
        async function fetchFonts() {
            try {
                setFontsAreLoading(true);
                const { data } = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts", {
                    params: { sort: "alpha", key: GOOGLE_API_KEY },
                });
                fontsListRef.current = data.items;
            } catch (err) {
                console.error("Erreur de récupération des Google Fonts :", err);
            } finally {
                setFontsAreLoading(false);
            }
        }
        fetchFonts();
    }, []);

    const loadFontIfNeeded = useCallback((font) => {
        if (!font || loadedFonts.current.has(font)) return;

        const currentFontObject = fontsListRef.current.find(
            (fontTest) => fontTest.family === font.fontFamily || fontTest.family === font.family
        );

        if (!currentFontObject) {
            console.warn(`Font ${font.fontFamily} not found`);
            return;
        }

        const variants = currentFontObject.variants.map(v => {
            if (v === "regular") return "400";
            if (v === "italic") return "400italic";
            return v;
        });

        const familyString = `${currentFontObject.family}:${variants.join(",")}`;


        WebFont.load({
            google: { families: [familyString] },
            active: () => loadedFonts.current.add(currentFontObject.family),
        });
    }, [fontsListRef.current]);

    return (
        <GoogleFontsContext.Provider
            value={{
                fontsList: fontsListRef.current,
                fontsAreLoading,
                loadFontIfNeeded,
                loadedFonts: loadedFonts.current,
            }}
        >
            {children}
        </GoogleFontsContext.Provider>
    );
}

export function useGoogleFonts() {
    return useContext(GoogleFontsContext);
}
