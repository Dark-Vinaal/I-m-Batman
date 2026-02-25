import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BatComputerProps {
    isOverlay?: boolean;
    onClose?: () => void;
}

const BatComputer: React.FC<BatComputerProps> = ({ isOverlay = false, onClose }) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const logs = [
            "DECRYPTING QUANTUM STREAM...",
            "ENCRYPTING MULTI-VECTOR TUNNELLING... SUCCESS",
            "REFINING ISOTOPE SCANS... COMPLETED",
            "LOCATING TACTICAL ASSETS... IDENTIFIED",
            "SYNCING WITH SATELLITE ARRAY... SECURE",
            "CALIBRATING ATMOSPHERIC SENSORS...",
            "ACCESSING ARCHIVE ALPHA... AUTHORIZED",
            "SYSTEM STATUS: IMMACULATE"
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setLines(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, [isOverlay]);

    if (isOverlay) {
        return (
            <AnimatePresence>
                <div className="fixed inset-0 z-[100] bg-lux-black text-lux-white font-sans p-8 overflow-y-auto">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                            <h2 className="text-2xl font-lux-serif tracking-tight">Command Center</h2>
                            <button onClick={onClose} className="lux-button px-6 py-2 text-xs">DISCONNECT</button>
                        </div>
                        <BatComputerContent lines={lines} />
                    </div>
                </div>
            </AnimatePresence>
        );
    }

    return (
        <section className="min-h-screen w-full bg-lux-black font-sans text-xs md:text-sm text-lux-white p-10 flex flex-col items-center justify-center overflow-hidden relative border-t border-white/5">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.05)_0%,transparent_70%)]"></div>
            <BatComputerContent lines={lines} />
        </section>
    );
};

const BatComputerContent = ({ lines }: { lines: string[] }) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const computerQuotes = [
        "Everything's impossible until somebody does it.",
        "It's not who I am underneath, but what I do that defines me.",
        "A hero can be anyone",
        "The night is darkest just before the dawn.",
        "I am the shadows."
    ];

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuoteIndex(prev => (prev + 1) % computerQuotes.length);
        }, 5000);
        return () => clearInterval(quoteInterval);
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
            {/* Left Panel: Logs */}
            <div className="lux-card p-8 bg-black/40 border-white/5 flex flex-col h-[400px]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-lux-accent animate-pulse" />
                    <h3 className="text-sm font-sans tracking-[0.3em] uppercase text-lux-white/50">Neural Stream</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] md:text-xs">
                    {lines.map((line, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3 text-lux-white/80"
                        >
                            <span className="text-lux-accent/40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                            <span>{line}</span>
                        </motion.div>
                    ))}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-lux-accent/40"
                    />
                </div>
            </div>

            {/* Middle Panel: Visualizer */}
            <div className="lux-card p-8 bg-gradient-to-br from-lux-accent/5 to-transparent border-lux-accent/20 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Ring 1 */}
                    <div className="absolute inset-0 rounded-full border border-lux-accent/20 animate-[spin_10s_linear_infinite]" />
                    {/* Ring 2 */}
                    <div className="absolute inset-4 rounded-full border border-lux-accent/40 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
                    {/* Ring 3 */}
                    <div className="absolute inset-8 rounded-full border-2 border-lux-accent shadow-[0_0_30px_rgba(0,210,255,0.3)]" />
                    
                    <div className="text-center z-10">
                         <span className="text-[10px] uppercase tracking-widest text-lux-white/40 block mb-1">Scanning</span>
                         <span className="text-xl font-lux-serif">CORE</span>
                    </div>
                </div>
                
                <div className="mt-12 w-full space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentQuoteIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center font-lux-serif italic text-lux-white/60 text-lg"
                        >
                            "{computerQuotes[currentQuoteIndex]}"
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Panel: Metrics */}
            <div className="lux-card p-8 bg-black/40 border-white/5 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-lux-gold/60" />
                    <h3 className="text-sm font-sans tracking-[0.3em] uppercase text-lux-white/50">Market Metrics</h3>
                </div>
                <div className="space-y-8 flex-1">
                    <MetricBar label="Global Reach" level={85} />
                    <MetricBar label="Encryption Strength" level={98} />
                    <MetricBar label="Operational Efficiency" level={92} />
                    <MetricBar label="Lux Exposure" level={45} />
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-lux-white/20">
                    <span>Ver 4.0.2</span>
                    <span>System Secure</span>
                </div>
            </div>
        </div>
    );
};

const MetricBar = ({ label, level }: { label: string, level: number }) => (
    <div>
        <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-lux-white/40">{label}</span>
            <span className="text-xs font-mono text-lux-accent">{level}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/5 relative">
            <motion.div
                className="absolute top-0 left-0 h-full bg-lux-accent shadow-[0_0_10px_rgba(0,210,255,0.5)]"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </div>
    </div>
);

export default BatComputer;
