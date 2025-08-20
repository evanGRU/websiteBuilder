import React, {createContext, useContext, useEffect, useRef} from "react";
import interact from "interactjs";

const DragComponentContext = createContext();

export function DragComponentProvider({ children }) {
    const position = useRef({ x: 0, y: 0 });

    useEffect(() => {
        interact('.draggable').draggable({
            listeners: {
                start(event) {
                    console.log('start drag');
                },
                move(event) {
                    position.current.x += event.dx;
                    position.current.y += event.dy;
                    event.target.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
                },
                end(event) {
                    position.current.x = 0;
                    position.current.y = 0;
                    event.target.style.transform = `translate(0px, 0px)`;

                    console.log('end drag');
                },
            },
        });

        return () => {
            interact('.new-comp-btn-drag').unset();
        };
    }, []);

    return (
        <DragComponentContext.Provider value={{

        }}>
            {children}
        </DragComponentContext.Provider>
    );
}

export function useDragComponent() {
    return useContext(DragComponentContext);
}
