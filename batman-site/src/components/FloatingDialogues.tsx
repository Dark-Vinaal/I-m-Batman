import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const dialogues = [
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

const FloatingDialogues: React.FC = () => {
    const [currentDialogue, setCurrentDialogue] = useState<{ text: string, x: number, y: number } | null>(null);

    useEffect(() => {
        const trigger = () => {
            const delay = Math.random() * 8000 + 4000;
            setTimeout(() => {
                const text = dialogues[Math.floor(Math.random() * dialogues.length)];
                // Random position near edges
                const x = Math.random() > 0.5 ? Math.random() * 10 : 80 + Math.random() * 10;
                const y = Math.random() * 80 + 10;

                setCurrentDialogue({ text, x, y });

                setTimeout(() => {
                    setCurrentDialogue(null);
                    trigger();
                }, 3000);
            }, delay);
        };

        trigger();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden whitespace-nowrap">
            <AnimatePresence>
                {currentDialogue && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.1, y: 0 }}
                        exit={{ opacity: 0, filter: "blur(15px)" }}
                        style={{ left: `${currentDialogue.x}%`, top: `${currentDialogue.y}%` }}
                        className="absolute text-[10px] md:text-xs font-lux-serif italic text-lux-white/40 tracking-[0.4em] select-none uppercase"
                    >
                        {currentDialogue.text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingDialogues;
