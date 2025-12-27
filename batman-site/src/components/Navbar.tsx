import GradientText from './GradientText';
import { useState, type FC } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

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
    const { isMuted, toggleMute, isPlaying, togglePlay } = useAudio();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center mix-blend-difference text-white">
            <div
                className="relative cursor-pointer group select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onLogoClick}
            >
                <div className="relative">
                    {/* Batman font only on navbar logo */}
                    <h1 className="text-2xl font-bold tracking-[0.2em] font-bat uppercase relative z-10">
                        <GradientText
                            colors={["#4b5563", "#9ca3af", "#e5e7eb", "#ffffff", "#e5e7eb", "#9ca3af", "#4b5563"]}
                            animationSpeed={6}
                            showBorder={false}
                            className="!font-bat !text-2xl !tracking-[0.2em]"
                        >
                            {isHovered ? "Bruce Wayne" : "Batman"}
                        </GradientText>
                    </h1>

                    {/* Mini Bats Reassemble Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                        {miniBats.map((bat) => (
                            <motion.div
                                key={bat.id}
                                className="absolute top-1/2 left-1/2"
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                animate={isHovered ? {
                                    x: bat.targetX,
                                    y: bat.targetY,
                                    rotate: bat.rotation,
                                    opacity: [0, 0.8, 0],
                                    scale: [0, 1.5, 0],
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
                                }}
                            >
                                <img
                                    src="/assets/bathover.png"
                                    alt="bat"
                                    className="w-6 h-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-bat-red origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
            </div>

            {/* Navigation Links - Using Tactical Reveal effect */}
            <ul className="flex space-x-6 md:space-x-10 text-xs md:text-sm tracking-widest uppercase items-center">
                {['Home', 'About', 'Contact'].map((item) => (
                    <li key={item} className="relative group cursor-pointer overflow-visible px-2 py-1">
                        {/* Tactical Reveal Effect - Ash Gray bar slides from left */}
                        <div className="hover-tactical relative z-10 transition-all duration-300">
                            <GradientText
                                colors={["#6b7280", "#e5e7eb", "#ffffff", "#9ca3af", "#6b7280"]} // Gray-500, Gray-200, White, Gray-400, Gray-500
                                animationSpeed={5}
                                showBorder={false}
                                className="!text-sm"
                            >
                                {item}
                            </GradientText>
                        </div>

                        {/* Bottom line animation */}
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-bat-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
                    </li>
                ))}

                {/* Play/Pause Button - Using HUD effect */}
                <li className="ml-4">
                    <button
                        onClick={togglePlay}
                        className="hover-hud relative w-8 h-8 bg-bat-grey/30 rounded-full border border-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-bat-grey/50 cursor-pointer"
                        aria-label={isPlaying ? "Pause Music" : "Play Music"}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white ml-0.5">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        )}
                    </button>
                </li>

                {/* Audio Mute Toggle Button - Using HUD effect */}
                <li className="ml-2">
                    <button
                        onClick={toggleMute}
                        className="hover-hud relative w-10 h-6 bg-bat-grey/30 rounded-full border border-white/10 flex items-center px-1 transition-colors duration-300 hover:bg-bat-grey/50 cursor-pointer"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        <motion.div
                            className="w-4 h-4 rounded-full bg-white flex items-center justify-center"
                            animate={{ x: isMuted ? 0 : 16 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            {isMuted ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5 text-black">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5 text-black">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                </svg>
                            )}
                        </motion.div>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
