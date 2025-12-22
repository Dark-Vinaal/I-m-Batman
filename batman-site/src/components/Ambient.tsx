import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Bats from './Ambient/Bats.tsx';

const Ambient: React.FC = () => {
    return (
        <div className='fixed inset-0 pointer-events-none z-0'>
            {/* Fog Layers */}
            <div className="fog-container absolute inset-0 z-10 opacity-50">
                <div className="fog-img"></div>
                <div className="fog-img-2"></div>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-20">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
                    <Suspense fallback={null}>
                        <Bats />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
};

export default Ambient;
