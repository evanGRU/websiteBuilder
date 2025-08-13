import './googleFontsModal.scss';
import React, { useEffect, useRef } from "react";
import EditDefaultModal from "../editDefaultModal/EditDefaultModal";
import { FixedSizeList } from "react-window";
import {useGoogleFonts} from "../../../services/contexts/GoogleFontsContext";

const GoogleFontsModal = ({ currentFont, setTempFontFamily, handleCloseModal, handleSubmit }) => {
    const listRef = useRef(null);

    const { fontsList, loadFontIfNeeded } = useGoogleFonts();

    useEffect(() => {
        if (fontsList.length === 0 || !currentFont || !listRef.current) return;

        const index = fontsList.findIndex(f => f.family === currentFont);
        if (index !== -1) {
            listRef.current.scrollToItem(index, "center");
        }
    }, [fontsList, currentFont]);


    const Row = ({ index, style }) => {
        const font = fontsList[index];
        const ref = useRef(null);

        useEffect(() => {
            if (!ref.current) return;

            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            loadFontIfNeeded(font);
                            observer.disconnect();
                        }
                    });
                },
                { rootMargin: "200px" }
            );

            observer.observe(ref.current);

            return () => observer.disconnect();
        }, [font, loadFontIfNeeded]);

        return (
            <div
                ref={ref}
                style={{
                    ...style,
                    fontFamily: `"${font.family}", ${font.category}`,
                    background: currentFont === font.family ? "#f0f0f0" : "transparent",
                }}
                className={"font-item"}
                onMouseOver={() => setTempFontFamily(font)}
                onMouseLeave={() => setTempFontFamily(null)}
                onClick={() => handleSubmit(font)}
            >
                {font.family}
            </div>
        );
    };


    return (
        <EditDefaultModal onClose={handleCloseModal} title={"Changer de font"}>
            <FixedSizeList
                ref={listRef}
                height={300}
                itemCount={fontsList.length}
                itemSize={25}
                width="100%"
                classname={"test"}
            >
                {Row}
            </FixedSizeList>
        </EditDefaultModal>
    );
};

export default GoogleFontsModal;
