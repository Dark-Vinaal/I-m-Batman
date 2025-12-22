import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState<"default" | "hover" | "click">("default");

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const mouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('.cursor-pointer')) {
                setCursorType("hover");
            } else {
                setCursorType("default");
            }
        };

        const mouseDown = () => setCursorType("click");
        const mouseUp = () => setCursorType("hover");

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", mouseOver);
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mouseup", mouseUp);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", mouseOver);
            window.removeEventListener("mousedown", mouseDown);
            window.removeEventListener("mouseup", mouseUp);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            rotate: 0,
            opacity: 0.6,
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.8,
            rotate: 45,
            opacity: 1,
        },
        click: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 0.8,
            rotate: -45,
            opacity: 1,
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
            variants={variants}
            animate={cursorType}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <svg viewBox="0 0 512 512" fill="white" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                <path d="M472.9 83.7C472.9 83.7 398.8 45.4 346.9 83.7 325 56.4 290.7 39 253.1 39 216 39 181.7 56.4 159.9 83.7 107.9 45.4 33.9 83.7 33.9 83.7c0 0 11.1 93.3 92.5 137.9-2.5 8.7-3.9 17.9-3.9 27.2 0 42.4 25.1 78.4 61.6 95.1-4.7 16.7-18.6 30.2-37.1 33.9-37.5 7.5-62.8-21.8-62.8-21.8s15.3 64.9 66.8 64.9c37.6 0 70.3-24.6 82.3-58.4 6-1.5 12.3-2.3 18.8-2.3 8.3 0 16.4.4 24.3 2.8 12 30.8 42.1 52.8 77.3 52.8 51.5 0 66.8-64.9 66.8-64.9s-25.3 29.3-62.8 21.8c-18.5-3.7-32.4-17.2-37.1-33.9 36.5-16.8 61.6-52.7 61.6-95.1 0-9.4-1.4-18.5-3.9-27.2 81.3-44.6 92.4-137.9 92.4-137.9z" />
            </svg>
        </motion.div>
    );
};

export default Cursor;
