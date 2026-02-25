import { type FC } from 'react';
import { motion } from 'framer-motion';

const Hero: FC = () => {
  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-lux-black"
    >
      {/* Background with spotlight effect */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 grayscale brightness-[0.3]"
        >
          <source src="/assets/BruceWayne.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-lux-black/10 via-lux-black/60 to-lux-black z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lux-accent/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-xl md:text-2xl font-sans tracking-[0.5em] text-lux-white/60 uppercase mb-4">
            The Dark Knight Archives
          </h2>
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-lux-serif tracking-tighter text-lux-white mb-2">
            Vengeance <br />
            <span className="italic font-light opacity-80">Personified</span>
          </h1>
          <p className="max-w-xl mx-auto text-lux-white/40 text-sm md:text-base leading-relaxed tracking-wide font-sans mb-12">
            The shadows of Gotham conceal a watchful guardian. <br /> 
            Where fear meets justice, the Batman is born.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-6">
               <button className="lux-button">
                 Enter The Batcave
               </button>
               <div className="flex flex-col items-start">
                  <span className="text-2xl font-lux-serif text-lux-white">85+ Years</span>
                  <span className="text-[10px] tracking-widest text-lux-white/30 uppercase">Of Legacy</span>
               </div>
            </div>

            <div className="h-10 w-[1px] bg-white/10 hidden md:block" />

            <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-lux-white/40 font-sans">
              <span className="text-lux-accent border-b border-lux-accent">Detective</span>
              <span>Martial Arts</span>
              <span>Technology</span>
               <div className="flex items-center gap-1 ml-4 border border-white/10 px-3 py-1 rounded-full">
                  <span>Abilities</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Side accent */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-4">
         <div className="w-[1px] h-20 bg-gradient-to-b from-lux-accent to-transparent" />
         <span className="vertical-text text-[10px] tracking-[0.4em] uppercase text-lux-white/20 font-sans [writing-mode:vertical-lr]">
            Wayne Enterprises
         </span>
      </div>
    </motion.section>
  );
};

export default Hero;
