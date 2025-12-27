import React from 'react';
import { motion } from 'framer-motion';
import GhostCursor from './GhostCursor';

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
        <section className="bg-bat-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bat-dark/50 to-bat-black pointer-events-none"></div>

            {/* Hidden Batman Section */}
            <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-black mb-20 group">
                {/* Top Gradient Fade for smooth merge */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bat-black to-transparent z-10 pointer-events-none"></div>

                <GhostCursor
                    color="#ffffff"
                    brightness={1.2}
                    edgeIntensity={0.5}
                    trailLength={50}
                    inertia={0.3}
                    grainIntensity={0.08}
                    bloomStrength={0.3}
                    bloomRadius={0.5}
                    mixBlendMode="screen"
                />

                {/* Hidden Image - Spotlight Effect using mask-image */}
                <div
                    className="absolute inset-0 z-0 flex items-center justify-center"
                >
                    {/* 
                        We need to track mouse position for the mask. 
                        Ideally we'd use a small script or state. Since I can't add state easily without rewriting the whole component start,
                        I will use a clever CSS trick with group-hover or just absolute positioning if possible? No.
                        Let's use a masked image that is revealed by the GhostCursor's canvas? 
                        The GhostCursor is a canvas overlay. 
                        
                        ACTUALLY, the user wants it to be visible "only near the cursor".
                        I will add state to track mouse position and apply a radial-gradient mask.
                    */}
                    <SpotlightImage />
                </div>

                {/* Bottom Gradient Fade for smooth merge */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bat-black to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-20">
                {/* DC Comics Link - Using Batarang Sharpness effect */}
                <div className="text-center mb-16">
                    <a
                        href="https://www.dc.com/characters/batman"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-batarang inline-block px-8 py-3 border border-bat-red/50 text-bat-silver hover:text-white hover:border-bat-red tracking-[0.3em] uppercase text-sm font-semibold"
                    >
                        Explore Batman on DC.com →
                    </a>
                </div>

                {/* Clips Section */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bat text-bat-silver mb-10 tracking-[0.3em] text-center"
                    >
                        ICONIC CLIPS
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {clips.map((clip, i) => (
                            <motion.div
                                key={clip.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="hover-shadow-vanish hover-hud aspect-video bg-bat-grey/20 rounded-lg overflow-hidden"
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
                                    className="w-full h-full"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* BGM Section */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bat text-bat-silver mb-10 tracking-[0.3em] text-center"
                    >
                        THE BATMAN THEME
                    </motion.h2>
                    <div className="max-w-4xl mx-auto">
                        {bgm.map((track, i) => (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="hover-shadow-vanish hover-hud-scanline aspect-video bg-bat-grey/20 rounded-lg overflow-hidden border-2 border-bat-red/30 shadow-[0_0_60px_rgba(102,0,0,0.3)] relative"
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
                                    className="w-full h-full"
                                ></iframe>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trailers Section */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bat text-bat-silver mb-10 tracking-[0.3em] text-center"
                    >
                        OFFICIAL TRAILERS
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {trailers.map((trailer, i) => (
                            <motion.div
                                key={trailer.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="hover-shadow-vanish hover-hud aspect-video bg-bat-grey/20 rounded-lg overflow-hidden"
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
                                    className="w-full h-full"
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
