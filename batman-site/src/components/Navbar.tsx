import { useState, type FC } from 'react';
import { motion } from 'framer-motion';

const miniBats = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    initialX: (Math.random() - 0.5) * 20,
    initialY: (Math.random() - 0.5) * 20,
    targetX: (Math.random() - 0.5) * 150,
    targetY: (Math.random() - 0.5) * 150,
    rotation: Math.random() * 360,
}));

const Navbar: FC<{ onLogoClick: () => void }> = ({ onLogoClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center mix-blend-difference text-white">
            <div
                className="relative cursor-pointer group select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onLogoClick}
            >
                <div className="relative">
                    <h1 className="text-2xl font-bold tracking-[0.2em] font-bat uppercase relative z-10">
                        {isHovered ? "Bruce Wayne" : "Batman"}
                    </h1>

                    {/* Mini Bats Reassemble Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                        {miniBats.map((bat) => (
                            <motion.div
                                key={bat.id}
                                className="absolute top-1/2 left-1/2 w-3 h-3 text-white fill-current opacity-40"
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                animate={isHovered ? {
                                    x: bat.targetX,
                                    y: bat.targetY,
                                    rotate: bat.rotation + 360,
                                    opacity: [0, 0.4, 0],
                                    scale: [0, 1, 0],
                                } : {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    opacity: 0,
                                    scale: 0,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                    // No repeat, just fly out and "disappear/reassemble" back to 0
                                }}
                            >
                                <svg viewBox="0 0 512 512">
                                    <path d="M472.9 83.7C472.9 83.7 398.8 45.4 346.9 83.7 325 56.4 290.7 39 253.1 39 216 39 181.7 56.4 159.9 83.7 107.9 45.4 33.9 83.7 33.9 83.7c0 0 11.1 93.3 92.5 137.9-2.5 8.7-3.9 17.9-3.9 27.2 0 42.4 25.1 78.4 61.6 95.1-4.7 16.7-18.6 30.2-37.1 33.9-37.5 7.5-62.8-21.8-62.8-21.8s15.3 64.9 66.8 64.9c37.6 0 70.3-24.6 82.3-58.4 6-1.5 12.3-2.3 18.8-2.3 8.3 0 16.4.4 24.3 2.8 12 30.8 42.1 52.8 77.3 52.8 51.5 0 66.8-64.9 66.8-64.9s-25.3 29.3-62.8 21.8c-18.5-3.7-32.4-17.2-37.1-33.9 36.5-16.8 61.6-52.7 61.6-95.1 0-9.4-1.4-18.5-3.9-27.2 81.3-44.6 92.4-137.9 92.4-137.9z" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-bat-red origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
            </div>

            <ul className="flex space-x-6 md:space-x-10 text-xs md:text-sm tracking-widest uppercase font-sans">
                {['Home', 'About', 'Contact'].map((item) => (
                    <li key={item} className="relative group cursor-pointer overflow-hidden px-2 py-1">
                        <span className="relative z-10 group-hover:text-gray-300 transition-colors duration-300">{item}</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-bat-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>

                        {/* Scratch effect */}
                        <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white opacity-0 group-hover:opacity-50 group-hover:animate-ping"></span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
