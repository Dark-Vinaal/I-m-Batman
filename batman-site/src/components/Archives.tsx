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
        <section className="py-32 px-6 bg-lux-black border-t border-white/5">
            <div className="container mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-sm tracking-[0.5em] text-lux-white/40 uppercase mb-4 font-sans">Gotham Citizens</h2>
                    <h3 className="text-5xl md:text-7xl font-lux-serif text-lux-white tracking-tight">
                        Witness Accounts, <br /> Honest Testimonials.
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                         <div className="flex gap-4">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-lux-accent opacity-50">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56888 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56888 8 8.0166 8H5.0166C3.91203 8 3.0166 7.10457 3.0166 6V3L10.0166 3V15C10.0166 18.3137 7.3303 21 4.0166 21H3.0166Z" />
                            </svg>
                         </div>
                         <p className="text-xl md:text-2xl font-lux-serif text-lux-white/80 leading-relaxed italic">
                            The dark silhouette appeared from nowhere, moving with a precision that defied everything I knew about human capability. He didn't say a word — he didn't need to. The criminals scattered like roaches. Gotham has a guardian angel in black.
                         </p>
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-lux-accent p-[2px]">
                                <img src="/assets/Bruce_Wayne.webp" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div>
                                <h4 className="text-lux-white font-sans text-sm tracking-wide">Selina Kyle</h4>
                                <p className="text-lux-white/30 text-[10px] uppercase tracking-widest">Gotham City Resident</p>
                            </div>
                         </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {images.slice(1).map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="lux-card group overflow-hidden"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <img 
                                        src={img.src} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-lux-black/40" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-center">
                                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-lux-accent" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white/30" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-lux-white font-lux-serif text-lg mb-1">{img.title}</h4>
                                    <p className="text-lux-white/30 text-[10px] uppercase tracking-widest">Case File</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Archives;
