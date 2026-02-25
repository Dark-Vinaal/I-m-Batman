import React from 'react';
import { motion } from 'framer-motion';

const clips = [
    { id: "761uRaAoW00", title: "Batman Clip 1" },
    { id: "8zBAw3_AXe8", title: "Batman Clip 2" },
    { id: "EpWgSwayMps", title: "Batman Clip 3" },
];

const bgm = [
    { id: "Cwcinb2OxUo", title: "The Batman Theme - Epic Version" },
];

const trailers = [
    { id: "neY2xVmOfUM", title: "The Batman Trailer 1" },
    { id: "EXeTwQWrcwY", title: "The Batman Trailer 2" },
    { id: "g8evyE9TuYk", title: "The Batman Trailer 3" },
    { id: "mqqft2x_Aa4", title: "The Batman Trailer 4" },
];

const SpotlightImage = () => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        // Attach to window or parent if possible, but for now we attach to the specific container ref in the component
        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        // Fallback: Attach to specific parent group .relative by query selector if ref doesn't capture 
        // because we are putting this inside the div.
        // Actually, let's attach to the window for simplicity and check bound relative to a ref.

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full" onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}>
            <img
                src="/assets/batman.jpg"
                alt="Hidden Batman"
                className="w-full h-full object-cover mix-blend-screen pointer-events-none"
                style={{
                    filter: 'contrast(1.3) brightness(1.3) grayscale(0.5)',
                    maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 90%)`,
                    WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 90%)`,
                    opacity: 0.8
                }}
            />
        </div>
    );
};

const MediaSection: React.FC = () => {
    return (
        <section className="bg-lux-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-lux-black pointer-events-none"></div>

            {/* Spotlight Section */}
            <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-black mb-20 group border-t border-b border-white/5">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-lux-black to-transparent z-10 pointer-events-none"></div>

                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <SpotlightImage />
                </div>

                <div className="relative z-20 text-center">
                     <span className="text- lux-accent text-[10px] tracking-[0.6em] uppercase mb-4 block opacity-50">The Dark Knight</span>
                     <h2 className="text-4xl md:text-6xl font-lux-serif italic text-lux-white/90">The Unseen Detail</h2>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-lux-black to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-20">
                {/* DC Comics Link */}
                <div className="text-center mb-24">
                    <a
                        href="https://www.dc.com/characters/batman"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lux-button-outline inline-block px-12 py-4 text-xs tracking-[0.4em]"
                    >
                        EXPLORE THE LEGACY →
                    </a>
                </div>

                {/* Clips Section */}
                <div className="mb-32">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-lux-accent text-[10px] tracking-[0.4em] uppercase mb-2">Cinematic</span>
                        <h2 className="text-3xl md:text-5xl font-lux-serif text-lux-white/90 tracking-tight">Iconic Moments</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clips.map((clip, i) => (
                            <motion.div
                                key={clip.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="lux-card aspect-video bg-black/40 overflow-hidden group"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${clip.id}`}
                                    title={clip.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* BGM Section */}
                <div className="mb-32">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-lux-accent text-[10px] tracking-[0.4em] uppercase mb-2">Atmospheric</span>
                        <h2 className="text-3xl md:text-5xl font-lux-serif text-lux-white/90 tracking-tight">Symphony Of Night</h2>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        {bgm.map((track, i) => (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="lux-card aspect-video border-lux-accent/20 bg-black/40 overflow-hidden shadow-[0_0_50px_rgba(0,210,255,0.05)]"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${track.id}`}
                                    title={track.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trailers Section */}
                <div>
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-lux-accent text-[10px] tracking-[0.4em] uppercase mb-2">Unreleased</span>
                        <h2 className="text-3xl md:text-5xl font-lux-serif text-lux-white/90 tracking-tight">The Vision</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {trailers.map((trailer, i) => (
                            <motion.div
                                key={trailer.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="lux-card aspect-video bg-black/40 overflow-hidden"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${trailer.id}`}
                                    title={trailer.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MediaSection;
