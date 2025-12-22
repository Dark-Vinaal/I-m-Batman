import React from 'react';
import { motion } from 'framer-motion';

const gadgets = [
    { title: "NANO GADGET", img: "/assets/nano_banana.png", quote: "Everything's impossible until somebody does it." },
    { title: "KINETIC SUIT", img: "/assets/nano_suit.png", quote: "It’s not who I am underneath, but what I do that defines me." },
    { title: "SYSTEM HUD", img: "/assets/nano_ui.png", quote: "A hero can be anyone" },
];

const Arsenal: React.FC = () => {
    return (
        <section className="py-20 bg-bat-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <h2 className="text-4xl font-bat text-bat-silver mb-16 tracking-widest text-center">THE ARSENAL</h2>

            <div className="flex flex-wrap justify-center gap-10 px-10">
                {gadgets.map((gadget, i) => (
                    <div key={i} className="w-full md:w-[30%] group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative aspect-square border border-white/5 bg-bat-grey/20 overflow-hidden rounded-lg hover:border-bat-red/50 transition-colors duration-500 shadow-2xl"
                        >
                            <img
                                src={gadget.img}
                                alt={gadget.title}
                                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                                <h3 className="text-xl font-bat text-white mb-2">{gadget.title}</h3>
                                <p className="text-[10px] text-bat-red font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {gadget.quote}
                                </p>
                            </div>

                            {/* Hover texture */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-0 group-hover:opacity-10 pointer-events-none"></div>
                        </motion.div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
    );
};

export default Arsenal;
