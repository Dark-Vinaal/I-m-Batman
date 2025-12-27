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
    <main className={`relative w-full bg-bat-black text-white min-h-screen overflow-x-hidden selection:bg-bat-red selection:text-white ${jokerMode ? 'hue-rotate-90 invert' : ''}`}>
      <Cursor />
      <FloatingDialogues />
      <div className="film-grain"></div>
      <div className="vignette"></div>

      <Ambient />
      <Navbar onLogoClick={handleLogoClick} />

      <AnimatePresence>
        {wayneOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="fixed top-0 left-0 w-full bg-white text-black z-[100] overflow-hidden"
          >
            <div className="p-10 font-mono text-center">
              <h2 className="text-4xl font-bold mb-4">WAYNE ENTERPRISES SECURE LOGIN</h2>
              <p>ACCESS GRANTED. WELCOME, MISTER WAYNE.</p>
              <button onClick={() => setWayneOpen(false)} className="mt-4 px-6 py-2 bg-black text-white hover:scale-95 transition-transform active:scale-90 shadow-[0_5px_15px_rgba(0,0,0,0.4)]">CLOSE</button>
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

      <footer className="py-20 text-center text-bat-silver font-mono text-xs z-10 relative bg-black border-t border-white/5">
        <p className="tracking-[0.5em] opacity-30">WAYNE ENTERPRISES &copy; 2025. RESTRICTED ACCESS.</p>
        <div className="mt-4 flex justify-center gap-4 opacity-20">
          <span className="w-10 h-[1px] bg-white"></span>
          <span className="w-2 h-2 rounded-full bg-bat-red"></span>
          <span className="w-10 h-[1px] bg-white"></span>
        </div>
      </footer>

      {jokerMode && (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-20 mix-blend-exclusion bg-purple-900 animate-pulse"></div>
      )}
    </main>
  );
}

export default App;
