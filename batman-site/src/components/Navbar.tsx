import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../context/AudioContext";

const navLinks = ["About", "Gallery", "Armoury"];

/** Bat silhouette SVG used as the hamburger menu toggle */
const BatIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 64 40"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 4C28 4 24 8 22 12C18 6 12 2 6 2C4 2 2 3 2 5C2 10 6 16 12 20C6 22 2 28 2 34C2 36 4 38 6 38C14 38 22 30 28 22C30 26 31 30 32 34C33 30 34 26 36 22C42 30 50 38 58 38C60 38 62 36 62 34C62 28 58 22 52 20C58 16 62 10 62 5C62 3 60 2 58 2C52 2 46 6 42 12C40 8 36 4 32 4Z" />
  </svg>
);

const Navbar: FC<{ onLogoClick: () => void }> = ({ onLogoClick }) => {
  const { isMuted, toggleMute, isPlaying, togglePlay } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-7xl z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center glass rounded-full text-lux-white">
        {/* Logo */}
        <div
          className="relative cursor-pointer group select-none flex items-center gap-2"
          onClick={onLogoClick}
        >
          <div className="relative">
            <h1 className="text-lg md:text-xl font-lux-serif tracking-widest uppercase relative z-10 transition-colors duration-300 group-hover:text-lux-accent">
              Bruce Wayne
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-lux-accent transition-all duration-500 group-hover:w-full" />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex space-x-8 text-[11px] tracking-[0.3em] uppercase items-center font-sans">
          {navLinks.map((item) => (
            <li
              key={item}
              className="relative group cursor-pointer transition-colors duration-300 hover:text-lux-accent"
            >
              {item}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-lux-accent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </li>
          ))}

          <div className="h-4 w-[1px] bg-white/10 mx-2" />

          {/* Audio Controls */}
          <li className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/5 hover:border-lux-accent group"
              aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 text-white group-hover:text-lux-accent"
                >
                  <rect x="6" y="4" width="2" height="16"></rect>
                  <rect x="16" y="4" width="2" height="16"></rect>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 text-white ml-0.5 group-hover:text-lux-accent"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>

            <button
              onClick={toggleMute}
              className="relative p-1 transition-all duration-300 hover:text-lux-accent"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </li>
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-[11px] tracking-[0.2em] uppercase font-sans border border-white/10 px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Bat-Signal
          </button>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-lux-accent to-lux-white/50 p-[1px]">
            <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center text-[10px]">
              BW
            </div>
          </div>
        </div>

        {/* Mobile: Audio + Bat Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Compact audio toggle */}
          <button
            onClick={togglePlay}
            className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-lux-accent"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <rect x="6" y="4" width="2" height="16" />
                <rect x="16" y="4" width="2" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 ml-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Bat Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-lux-accent hover:bg-white/5"
            aria-label="Toggle Menu"
          >
            <BatIcon
              className={`w-6 h-4 transition-all duration-500 ${
                menuOpen
                  ? "text-lux-accent rotate-180 scale-110"
                  : "text-lux-white/70 hover:text-lux-accent"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center h-full gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative bat icon at top */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <BatIcon className="w-24 h-16 text-lux-accent" />
              </motion.div>

              {/* Nav Links */}
              <nav className="flex flex-col items-center gap-1 mt-4">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl md:text-5xl font-lux-serif tracking-wider text-lux-white/80 hover:text-lux-accent transition-colors duration-300 py-3 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lux-accent transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                ))}
              </nav>

              {/* Mobile controls row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center gap-6 mt-12"
              >
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-lux-white/40 hover:text-lux-accent transition-colors"
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                  {isMuted ? "Unmute" : "Sound On"}
                </button>

                <div className="h-4 w-[1px] bg-white/10" />

                <button className="text-[10px] tracking-[0.3em] uppercase text-lux-white/40 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  Bat-Signal
                </button>
              </motion.div>

              {/* Subtle footer in menu */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 text-[9px] tracking-[0.5em] uppercase text-lux-white/10 font-sans"
              >
                Wayne Enterprises
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
