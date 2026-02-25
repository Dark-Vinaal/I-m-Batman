import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const mouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('.cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", mouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", mouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 50 }}
            >
                <div className="w-2 h-2 rounded-full bg-lux-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            </motion.div>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? "rgba(0, 210, 255, 0.8)" : "rgba(0, 210, 255, 0.2)"
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
                <div className={`w-10 h-10 rounded-full border border-lux-accent/30 transition-colors duration-300`}></div>
            </motion.div>
        </>
    );
};

export default Cursor;
