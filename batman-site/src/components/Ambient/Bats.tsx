import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleInstances = ({ count = 100 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * viewport.width * 2.5,
            y: (Math.random() - 0.5) * viewport.height * 2.5,
            z: (Math.random() - 0.5) * 10 - 2,
            speed: Math.random() * 0.005 + 0.002,
            offset: Math.random() * 100,
        }));
    }, [count, viewport]);

    useFrame((state) => {
        if (!meshRef.current) return;

        particles.forEach((p, i) => {
            const t = state.clock.getElapsedTime();

            p.y += p.speed;
            p.x += Math.sin(t * 0.2 + p.offset) * 0.005;

            if (p.y > viewport.height) p.y = -viewport.height;

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.setScalar(Math.sin(t + p.offset) * 0.5 + 0.5);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#00d2ff" transparent opacity={0.4} />
        </instancedMesh>
    );
};

export default function Particles() {
    return (
        <group>
            <ParticleInstances />
        </group>
    );
}
