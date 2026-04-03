import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeonBats from './Ambient/Bats';
import { motion } from 'framer-motion';

const Ambient: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            const gallery = document.getElementById('gallery');
            const armoury = document.getElementById('armoury');
            
            if (gallery && armoury) {
                const galleryRect = gallery.getBoundingClientRect();
                const armouryRect = armoury.getBoundingClientRect();
                
                // Visible when gallery top enters screen, and until armoury bottom leaves screen
                if (galleryRect.top <= window.innerHeight && armouryRect.bottom >= 0) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility, { passive: true });
        // Initial test in case elements render later
        const timer = setTimeout(checkVisibility, 500);

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
            clearTimeout(timer);
        };
    }, []);

    return (
        <motion.div 
            className='fixed inset-0 pointer-events-none z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            {/* Fog Layers */}
            <div className="fog-container absolute inset-0 z-10 opacity-20">
                <div className="fog-img"></div>
                <div className="fog-img-2"></div>
            </div>

            {/* 3D Scene with Bloom */}
            <div className="absolute inset-0 z-20">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    gl={{ alpha: true, antialias: true }}
                    style={{ background: 'transparent' }}
                >
                    <Suspense fallback={null}>
                        <NeonBats />
                    </Suspense>

                    {/* Bloom postprocessing for neon glow */}
                    <EffectComposer>
                        <Bloom
                            intensity={1.2}
                            luminanceThreshold={0.1}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />
                    </EffectComposer>
                </Canvas>
            </div>
        </motion.div>
    );
};

export default Ambient;
