import React from 'react';
import { motion } from 'framer-motion';

const images = [
    { src: "/assets/Bruce_Wayne.webp", title: "THE BILLIONAIRE" },
    { src: "/assets/batman-gpt.webp", title: "THE DETECTIVE" },
    { src: "/assets/batman.jpg", title: "THE SYMBOL" },
    { src: "/assets/The_Batman.png", title: "THE VENGEANCE" },
];

const Archives: React.FC = () => {
    return (
        <section className="py-20 px-10 bg-bat-black">
            <h2 className="text-4xl font-bat text-bat-silver mb-16 tracking-widest text-center">BAT-SYSTEM ARCHIVES</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="group relative aspect-[3/4] bg-bat-dark overflow-hidden border border-white/5 rounded-sm cursor-none"
                    >
                        <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 brightness-50 group-hover:brightness-100"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-bat-red text-[10px] font-mono mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                SCANNING ASSET...
                            </p>
                            <h3 className="text-xl font-bat text-white tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                {img.title}
                            </h3>
                        </div>

                        {/* Carbon Fiber Texture Overlay on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Archives;
