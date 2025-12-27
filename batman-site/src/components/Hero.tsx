import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const miniBats = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  initialX: 0,
  initialY: 0,
  targetX: (Math.random() - 0.5) * 800,
  targetY: (Math.random() - 0.5) * 400,
  rotation: Math.random() * 720,
  scale: Math.random() * 1.5 + 0.5,
}));

const Hero: FC = () => {
  const [hovered, setHovered] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const text = hovered ? "BRUCE WAYNE" : "BATMAN";

  return (
    <motion.section
      animate={isShaking ? { x: [0, -2, 2, -2, 2, 0], y: [0, 1, -1, 1, -1, 0] } : {}}
      transition={{ duration: 0.2 }}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 grayscale contrast-125 brightness-[0.4]"
      >
        <source src="/assets/BruceWayne.mp4" type="video/mp4" />
      </video>

      {/* Overlay: Vignette & Grain is global, but we add a local dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center select-none">
        <motion.div
          className="relative inline-block cursor-crosshair"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence mode='wait'>
            <motion.h1
              key={text}
              initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[12vw] leading-none text-white tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,1)] font-bold uppercase"
            >
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  whileHover={{
                    y: -20,
                    textShadow: "0px 40px 30px rgba(0,0,0,1), 0px 80px 60px rgba(0,0,0,0.8)",
                    color: "#888"
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* Swarm of bats on hover */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {miniBats.map((bat) => (
              <motion.div
                key={bat.id}
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={hovered ? {
                  x: bat.targetX,
                  y: bat.targetY,
                  rotate: bat.rotation,
                  opacity: [0, 0.9, 0],
                  scale: [0, bat.scale, 0],
                } : {
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  repeat: hovered ? Infinity : 0,
                  repeatDelay: Math.random() * 0.5
                }}
              >
                <img
                  src="/assets/bathover.png"
                  alt="bat"
                  className="w-12 h-auto object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                />
              </motion.div>
            ))}
          </div>

          {/* Shadow Stretch Effect (pseudo-bats) */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center opacity-30 pointer-events-none">
            <motion.div
              animate={{
                height: hovered ? [20, 100, 20] : 20,
                opacity: hovered ? [0.2, 0.5, 0.2] : 0.2
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 bg-gradient-to-t from-transparent via-bat-silver to-transparent blur-xl"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-xl md:text-2xl tracking-[0.8em] text-bat-silver font-light uppercase mix-blend-difference"
        >
          THE SHADOW OF GOTHAM
        </motion.p>
      </div>

      <Lightning onFlash={() => setIsShaking(true)} onFlashEnd={() => setIsShaking(false)} />
    </motion.section>
  );
};

const Lightning = ({ onFlash, onFlashEnd }: { onFlash: () => void, onFlashEnd: () => void }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const loop = () => {
      const delay = Math.random() * 7000 + 3000;
      setTimeout(() => {
        setFlash(true);
        onFlash();
        setTimeout(() => {
          setFlash(false);
          onFlashEnd();
        }, 50);
        setTimeout(() => {
          setFlash(true);
          onFlash();
          setTimeout(() => {
            setFlash(false);
            onFlashEnd();
          }, 80);
        }, 120);
        loop();
      }, delay);
    };
    loop();
    return () => { };
  }, [onFlash, onFlashEnd]);

  return (
    <motion.div
      animate={{ opacity: flash ? 0.2 : 0 }}
      className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-overlay"
    />
  );
};

export default Hero;
