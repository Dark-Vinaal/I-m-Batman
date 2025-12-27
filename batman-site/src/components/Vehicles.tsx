import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const items = [
    {
        name: "BATMOBILE",
        img: "/assets/download.jpg",
        quote: "They think I'm hiding in the shadows. But I am the shadows!"
    },
    {
        name: "BATCYCLE",
        img: "/assets/download (1).jpg",
        quote: "Oh, you think darkness is your ally. But you merely adopted the dark; I was born in it, moulded by it."
    },
    {
        name: "BATWING",
        img: "/assets/download (2).jpg",
        quote: "You either die a hero, or you live long enough to see yourself become the villain."
    },
    {
        name: "THE BATMAN",
        img: "/assets/The_Batman.png",
        quote: "I am vengeance! I am the night! I am Batman!"
    },
];

const Vehicles: React.FC = () => {
    return (
        <section className="bg-bat-black py-20 overflow-hidden">
            <h2 className="text-4xl font-bat text-bat-silver mb-32 tracking-[0.5em] text-center">TACTICAL ASSETS</h2>
            <div className="container mx-auto px-6 space-y-40">
                {items.map((item, i) => (
                    <ZigZagSection key={i} item={item} index={i} />
                ))}
            </div>
        </section>
    );
};

const ZigZagSection = ({ item, index }: { item: typeof items[0], index: number }) => {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const xImg = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -100 : 100, 0, isEven ? -50 : 50]);
    const xText = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? 100 : -100, 0, isEven ? 50 : -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}>
            {/* Image Container with Shadow Vanish & Dark Knight Depth */}
            <motion.div
                style={{ x: xImg, opacity }}
                className="w-full md:w-1/2 relative group"
            >
                <div className="hover-shadow-vanish hover-hud aspect-video overflow-hidden rounded-lg bg-bat-grey/10 relative">
                    {/* Image with Dark Knight Depth effect */}
                    <img
                        src={item.img}
                        alt={item.name}
                        className="hover-dark-knight w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Red inner glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ boxShadow: 'inset 0 0 40px rgba(102, 0, 0, 0.5)' }}></div>

                    {/* Scanline effect overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]"></div>
                </div>

                {/* Tactical Label with Batarang effect */}
                <div className="hover-batarang absolute -top-4 -left-4 font-mono text-[10px] text-bat-red tracking-[0.3em] bg-black/80 px-4 py-1 border border-bat-red/30">
                    SECURE_ASSET_{index + 1}
                </div>
            </motion.div>

            {/* Text Container */}
            <motion.div
                style={{ x: xText, opacity }}
                className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}
            >
                <h3 className="text-3xl md:text-5xl font-bat text-white mb-6 tracking-widest">{item.name}</h3>
                <div className="relative inline-block">
                    <p className="text-lg md:text-2xl italic text-bat-silver leading-relaxed relative z-10">
                        "{item.quote}"
                    </p>
                    {/* Accent bar */}
                    <div className={`absolute -bottom-4 w-20 h-1 bg-bat-red/50 ${isEven ? 'left-0' : 'right-0'}`}></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Vehicles;
