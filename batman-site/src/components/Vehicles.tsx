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
        <section className="bg-lux-black py-32 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 text-center mb-24">
                <h2 className="text-sm tracking-[0.6em] text-lux-white/40 uppercase mb-4 font-sans">Strategic Assets</h2>
                <h3 className="text-5xl md:text-7xl font-lux-serif text-lux-white tracking-tight">
                    Machines You Won't <br /> Find Anywhere Else.
                </h3>
            </div>
            
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                {items.map((item, i) => (
                    <VehicleCard key={i} item={item} index={i} />
                ))}
            </div>

            <div className="mt-32 text-center">
                 <h4 className="text-2xl font-lux-serif text-lux-white mb-4">Advanced Engineering, Zero Compromise</h4>
                 <p className="text-lux-white/30 text-sm max-w-md mx-auto mb-8">
                    Every vehicle in the fleet is custom-built by Lucius Fox using Wayne Enterprises' most advanced technology.
                 </p>
                 <div className="flex justify-center items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-lux-accent transition-colors cursor-pointer group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 group-hover:text-lux-accent">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-lux-accent transition-colors cursor-pointer group">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 group-hover:text-lux-accent">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </div>
                 </div>
            </div>
        </section>
    );
};

const VehicleCard = ({ item, index }: { item: typeof items[0], index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    // Vehicle specs
    const spec = index === 0 ? "1,200 HP" : index === 1 ? "0–60 in 2.1s" : index === 2 ? "Mach 3.2" : "Classified";

    return (
        <motion.div 
            ref={ref}
            style={{ opacity, scale }}
            className="group relative"
        >
            <div className="lux-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-lux-white/5 to-transparent">
                <div className="w-full md:w-1/2 aspect-square overflow-hidden rounded-lg bg-black/40 border border-white/5 relative">
                    <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 font-sans text-[10px] tracking-widest text-lux-white/50 border border-white/10 px-2 py-1 rounded">
                        #{index + 1}
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-between h-full py-4">
                    <div>
                        <h4 className="text-lux-accent text-xs tracking-[0.3em] uppercase mb-4">Tactical Vehicle</h4>
                        <h3 className="text-3xl font-lux-serif text-lux-white mb-6 underline decoration-white/10 underline-offset-8 decoration-1">
                            {item.name}
                        </h3>
                        <p className="text-lux-white/40 text-xs md:text-sm leading-relaxed mb-8">
                            {item.quote.slice(0, 100)}...
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-3xl font-lux-serif text-lux-white">{spec}</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-lux-accent hover:text-black transition-all cursor-pointer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lux-accent/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

export default Vehicles;
