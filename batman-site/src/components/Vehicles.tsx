import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const vehicles = [
    { name: "BATMOBILE", img: "/assets/download.jpg", desc: "URBAN ASSAULT VEHICLE", quote: "Tell me, do you bleed? I'll make you bleed!" },
    { name: "BATCYCLE", img: "/assets/download (1).jpg", desc: "HIGH SPEED PURSUIT", quote: "They think I'm hiding in the shadows. But I am the shadows!" },
    { name: "BATWING", img: "/assets/download (2).jpg", desc: "AERIAL SUPERIORITY", quote: "Oh, you think darkness is your ally." },
];

const Vehicles: React.FC = () => {
    return (
        <div className='relative z-10 bg-bat-black'>
            {vehicles.map((v, i) => (
                <VehicleSection key={i} vehicle={v} />
            ))}
        </div>
    );
};

const VehicleSection = ({ vehicle }: { vehicle: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax & Tilt
    const rotateY = useTransform(scrollYProgress, [0.2, 0.8], [15, -15]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section ref={ref} className="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden perspective-1000">
            <motion.div style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute inset-0 pointer-events-none opacity-20 z-0">
                <h1 className="text-[20vw] font-bat text-bat-grey whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm">
                    {vehicle.name}
                </h1>
            </motion.div>

            <div className="relative z-10 text-center">
                <motion.h2
                    style={{ opacity, y: -50 }}
                    className="text-4xl md:text-6xl font-bat text-white mb-8 tracking-[0.2em] shadow-lg"
                >
                    {vehicle.name}
                </motion.h2>

                <motion.div
                    style={{ rotateY, scale, opacity, transformStyle: "preserve-3d" }}
                    className="w-[80vw] max-w-4xl aspect-video bg-bat-grey/30 rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group"
                >
                    <img
                        src={vehicle.img}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0 brightness-75 hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bat-black via-transparent to-transparent opacity-80"></div>
                </motion.div>

                <motion.p
                    style={{ opacity, y: 50 }}
                    className="mt-8 text-bat-red font-mono tracking-widest text-lg"
                >
                    STATUS: {vehicle.desc}
                </motion.p>
                <p className="mt-2 text-bat-silver text-xs italic font-sans opacity-40 group-hover:opacity-100 transition-opacity">
                    "{vehicle.quote}"
                </p>
            </div>
        </section>
    );
};

export default Vehicles;
