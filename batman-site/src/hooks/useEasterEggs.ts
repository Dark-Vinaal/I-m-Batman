import { useEffect, useState } from 'react';

export const useEasterEggs = () => {
    const [wayneOpen, setWayneOpen] = useState(false);
    const [jokerMode, setJokerMode] = useState(false);

    useEffect(() => {
        let keys: string[] = [];
        const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];


        const handleKeyDown = (e: KeyboardEvent) => {
            keys.push(e.key);
            if (keys.length > 20) keys.shift();

            // Check Wayne
            if (keys.slice(-5).join("").toLowerCase() === "wayne") {
                setWayneOpen(prev => !prev);
            }

            // Check Konami (Joker)
            if (keys.slice(-10).join("") === konami.join("")) {
                setJokerMode(prev => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return { wayneOpen, jokerMode, setWayneOpen, setJokerMode };
};
