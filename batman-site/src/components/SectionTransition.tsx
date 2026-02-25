import React from 'react';
import { motion } from 'framer-motion';

const SectionTransition: React.FC = () => {
    return (
        <div className="relative w-full h-40 flex items-center justify-center bg-lux-black overflow-hidden">
            {/* The "Slit of Light" */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
                className="w-[1px] h-full bg-lux-accent shadow-[0_0_20px_rgba(0,210,255,0.5)]"
            />

            {/* Horizontal dividers that feel like shadows */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
    );
};

export default SectionTransition;
