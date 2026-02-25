import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ambient from './components/Ambient';
import Vehicles from './components/Vehicles';
import Dialogue from './components/Dialogue';
import BatComputer from './components/BatComputer';
import Cursor from './components/Cursor';
import Archives from './components/Archives';
import Arsenal from './components/Arsenal';
import MediaSection from './components/MediaSection';
import FloatingDialogues from './components/FloatingDialogues';
import SectionTransition from './components/SectionTransition';
import { useEasterEggs } from './hooks/useEasterEggs';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { wayneOpen, jokerMode, setWayneOpen } = useEasterEggs();
  const [, setLogoClicks] = useState(0);
  const [showComputer, setShowComputer] = useState(false);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowComputer(true);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <main className={`relative w-full bg-lux-black text-lux-white min-h-screen overflow-x-hidden selection:bg-lux-accent selection:text-white ${jokerMode ? 'hue-rotate-90 invert' : ''}`}>
      <Cursor />
      <FloatingDialogues />
      <div className="film-grain opacity-20"></div>
      <div className="vignette opacity-50"></div>

      <Ambient />
      <Navbar onLogoClick={handleLogoClick} />

      <AnimatePresence>
        {wayneOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-lux-black/95 z-[100] flex items-center justify-center backdrop-blur-md"
          >
            <div className="max-w-xl w-full mx-4 lux-card p-12 text-center border-lux-accent/20">
              <span className="text-lux-accent text-[10px] tracking-[0.5em] uppercase mb-6 block">Biometric Verified</span>
              <h2 className="text-3xl md:text-5xl font-lux-serif mb-8 text-lux-white/90">Welcome back, Mr. Wayne</h2>
              <div className="flex flex-col gap-4">
                  <p className="text-lux-white/40 font-sans text-sm tracking-wide leading-relaxed mb-8">
                    Access to the classified archives and tactical systems has been restored. 
                    All systems are performing within optimal parameters.
                  </p>
                  <button onClick={() => setWayneOpen(false)} className="lux-button px-10 py-3 text-xs w-full max-w-xs mx-auto">ENTER ARCHIVE</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <Dialogue />

      <div className="relative z-10">
        <SectionTransition />
        <Vehicles />

        <SectionTransition />
        <MediaSection />

        <SectionTransition />
        <Arsenal />

        <SectionTransition />
        <Archives />

        <SectionTransition />
        <BatComputer isOverlay={showComputer} onClose={() => setShowComputer(false)} />
      </div>

      <footer className="py-32 text-center text-lux-white/20 font-sans text-[10px] z-10 relative bg-lux-black border-t border-white/5">
        <div className="container mx-auto px-6">
            <div className="flex justify-center gap-12 mb-12 opacity-50">
                <span className="tracking-[0.4em] uppercase hover:text-lux-accent transition-colors cursor-pointer">Gallery</span>
                <span className="tracking-[0.4em] uppercase hover:text-lux-accent transition-colors cursor-pointer">Archive</span>
                <span className="tracking-[0.4em] uppercase hover:text-lux-accent transition-colors cursor-pointer">Case Files</span>
            </div>
            <p className="tracking-[0.6em] mb-4">WAYNE ENTERPRISES &copy; 2026</p>
            <p className="tracking-[0.2em] opacity-40 uppercase">Protecting Gotham | Since 1939</p>
            <div className="mt-12 flex justify-center gap-6 items-center">
              <div className="w-12 h-[1px] bg-white/5" />
              <div className="w-1.5 h-1.5 rounded-full bg-lux-accent/30 animate-pulse" />
              <div className="w-12 h-[1px] bg-white/5" />
            </div>
        </div>
      </footer>

      {jokerMode && (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-20 mix-blend-exclusion bg-purple-900 animate-pulse"></div>
      )}
    </main>
  );
}

export default App;
