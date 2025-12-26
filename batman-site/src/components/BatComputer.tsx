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
            "INITIALIZING BATCOMPUTER SYSTEM...",
            "CONNECTING TO GOTHAM POLICE DATABASE...",
            "ENCRYPTING CONNECTION... SUCCESS",
            "SCANNING FOR ANOMALIES...",
            "TARGET IDENTIFIED: PENGUIN",
            "ANALYZING AUDIO SIGNATURES...",
            "DOWNLOADING CCTV FOOTAGE...",
            "SYSTEM SECURE."
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
    }, [isOverlay]); // reset on open



    if (isOverlay) {
        return (
            <AnimatePresence>
                <div className="fixed inset-0 z-[100] bg-black text-green-500 font-mono p-5 overflow-y-auto">
                    <button onClick={onClose} className="absolute top-5 right-5 border border-green-500 px-4 py-2 hover:bg-green-900">EXIT SYSTEM</button>
                    <BatComputerContent lines={lines} />
                </div>
            </AnimatePresence>
        );
    }

    return (
        <section className="min-h-screen w-full bg-black font-mono text-xs md:text-sm text-green-500 p-10 flex flex-col md:flex-row gap-10 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            <BatComputerContent lines={lines} />
        </section>
    );
};

const BatComputerContent = ({ lines }: { lines: string[] }) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const computerQuotes = [
        "I am vengeance!",
        "I am the night!",
        "I am Batman!",
        "They think I'm hiding in the shadows. But I am the shadows!",
        "You either die a hero, or you live long enough to see yourself become the villain.",
        "Your not brave! Men are brave!",
        "It’s not who I am underneath, but what I do that defines me.",
        "A hero can be anyone",
        "Tell me, do you bleed? I'll make you bleed!",
        "Everything's impossible until somebody does it.",
        "Oh, you think darkness is your ally. But you merely adopted the dark; I was born in it, moulded by it."
    ];

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuoteIndex(prev => (prev + 1) % computerQuotes.length);
        }, 5000);
        return () => clearInterval(quoteInterval);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-10 w-full">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] border-t border-green-900/50 pt-2 text-center overflow-hidden">
                <span className="text-[10px] text-green-800 font-bold tracking-[0.4em] block mb-1">DATA INTERCEPT</span>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentQuoteIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm italic text-green-400 font-mono"
                    >
                        "{computerQuotes[currentQuoteIndex]}"
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Left Panel: Logs */}
            <div className="w-full md:w-1/3 border border-green-800 p-6 bg-black/80 backdrop-blur-sm relative">
                <h3 className="text-xl font-bold border-b border-green-800 pb-2 mb-4">SYSTEM LOGS</h3>
                <div className="flex flex-col gap-2">
                    {lines.map((line, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="block"
                        >
                            {`> ${line}`}
                        </motion.span>
                    ))}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                    >_</motion.span>
                </div>
            </div>

            {/* Middle Panel: Map/Data */}
            <div className="w-full md:w-1/3 border border-green-800 p-6 bg-black/80 flex flex-col items-center justify-center relative min-h-[300px]">
                <div className="absolute top-2 left-2 text-[10px] text-green-700">COORD: 40.7128° N, 74.0060° W</div>
                <div className="w-40 h-40 rounded-full border-2 border-green-600 animate-pulse relative flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-green-800"></div>
                    <div className="absolute w-full h-[1px] bg-green-500 animate-[spin_4s_linear_infinite]"></div>
                </div>
                <p className="mt-4 animate-pulse">SEARCHING AREA...</p>
            </div>

            {/* Right Panel: Threat Levels */}
            <div className="w-full md:w-1/3 border border-green-800 p-6 bg-black/80">
                <h3 className="text-xl font-bold border-b border-green-800 pb-2 mb-4">THREAT ASSESSMENT</h3>
                <div className="space-y-4">
                    <ThreatBar label="GOTHAM CITY" level={85} color="bg-red-600" />
                    <ThreatBar label="ARKHAM ASYLUM" level={92} color="bg-red-800" />
                    <ThreatBar label="WAYNE ENTERPRISES" level={12} color="bg-green-600" />
                </div>
            </div>
        </div>
    );
};

const ThreatBar = ({ label, level, color }: { label: string, level: number, color: string }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span>{label}</span>
            <span>{level}%</span>
        </div>
        <div className="w-full h-2 bg-gray-900">
            <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </div>
    </div>
);

export default BatComputer;
