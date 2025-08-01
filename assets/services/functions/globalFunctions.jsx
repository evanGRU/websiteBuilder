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
