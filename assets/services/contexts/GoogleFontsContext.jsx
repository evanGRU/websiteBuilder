import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import WebFont from "webfontloader";
import {GOOGLE_API_KEY} from "../params";

const GoogleFontsContext = createContext(null);

export function GoogleFontsProvider({ children }) {
    const [fontsList, setFontsList] = useState([]);
    const loadedFonts = useRef(new Set());
    const [fontsAreLoading, setFontsAreLoading] = useState(true);

    useEffect(() => {
        async function fetchFonts() {
            try {
                setFontsAreLoading(true);
                const { data } = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts", {
                    params: { sort: "alpha", key: GOOGLE_API_KEY },
                });
                setFontsList(data.items);
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

        WebFont.load({
            google: { families: [font.family || font.fontFamily] },
            active: () => loadedFonts.current.add(font),
        });
    }, []);

    return (
        <GoogleFontsContext.Provider
            value={{
                fontsList,
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
