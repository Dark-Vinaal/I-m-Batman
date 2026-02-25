import React from 'react';
import { motion } from 'framer-motion';

const gadgets = [
    { title: "NANO GADGET", img: "/assets/nano_banana.png", quote: "Everything's impossible until somebody does it." },
    { title: "KINETIC SUIT", img: "/assets/nano_suit.png", quote: "It's not who I am underneath, but what I do that defines me." },
    { title: "SYSTEM HUD", img: "/assets/nano_ui.png", quote: "A hero can be anyone" },
];

const Arsenal: React.FC = () => {
    return (
        <section className="py-32 bg-lux-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-sm tracking-[0.5em] text-lux-white/40 uppercase mb-4 font-sans flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-lux-accent" />
                            Tactical Gears
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-lux-serif text-lux-white mb-8 tracking-tight">
                            The Arsenal Of <br /> A Dark Knight.
                        </h3>
                        <p className="text-lux-white/40 text-sm md:text-base leading-relaxed mb-12 max-w-lg">
                            Every piece of tactical equipment is engineered to perfection by Lucius Fox at Wayne Enterprises R&D.
                        </p>
                        
                        <div className="flex items-center gap-8">
                            <button className="lux-button">
                                Learn More
                            </button>
                            <div className="flex flex-col">
                                <span className="text-[10px] tracking-widest text-lux-white/30 uppercase font-sans">For the community</span>
                                <span className="text-lux-white font-sans text-sm">#1 Batman Fans Support</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="lux-card p-4 bg-gradient-to-br from-lux-accent/10 to-transparent">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                                <img 
                                    src="/assets/nano_ui.png" 
                                    className="w-full h-full object-cover"
                                    alt="System HUD"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                                    <h4 className="text-3xl font-lux-serif text-white">Mark VII</h4>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-lux-accent/20 blur-[80px] rounded-full -z-10" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {gadgets.map((gadget, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                                <img
                                    src={gadget.img}
                                    alt={gadget.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-lux-accent">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end">
                                     <div className="p-1 rounded-full border border-lux-accent bg-lux-accent/20">
                                         <div className="w-2 h-2 rounded-full bg-lux-accent shadow-[0_0_10px_rgba(0,210,255,1)]" />
                                     </div>
                                </div>
                            </div>
                            <h4 className="text-xl font-lux-serif text-lux-white mb-2">{gadget.title}</h4>
                            <p className="text-sm text-lux-white/30 font-sans tracking-wide">
                                Wayne Tech Prototype
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Arsenal;
