import React from 'react';
import { motion } from 'framer-motion';

const images = [
    { src: "/assets/Bruce_Wayne.webp", title: "THE BILLIONAIRE", quote: "A hero can be anyone" },
    { src: "/assets/batman-gpt.webp", title: "THE DETECTIVE", quote: "Everything's impossible until somebody does it." },
    { src: "/assets/batman.jpg", title: "THE SYMBOL", quote: "I am the night!" },
    { src: "/assets/The_Batman.png", title: "THE VENGEANCE", quote: "I am vengeance!" },
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
                        className="hover-shadow-vanish group relative aspect-[3/4] bg-bat-dark overflow-hidden rounded-sm cursor-none"
                    >
                        {/* Image with Dark Knight Depth Effect */}
                        <img
                            src={img.src}
                            alt={img.title}
                            className="hover-dark-knight w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Red tint inner glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{ boxShadow: 'inset 0 0 40px rgba(102, 0, 0, 0.5)' }}></div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-bat-red text-[10px] font-mono mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                "{img.quote}"
                            </p>
                            <h3 className="text-xl font-bat text-white tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                {img.title}
                            </h3>
                        </div>

                        {/* Carbon Fiber Texture Overlay on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                        {/* HUD Scanline effect on hover */}
                        <div className="hover-hud-scanline absolute inset-0 pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Archives;
