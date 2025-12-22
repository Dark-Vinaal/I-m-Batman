import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BatInstances = ({ count = 50 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport, clock } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Random starting positions and speeds
    const bats = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * viewport.width * 2,
            y: (Math.random() - 0.5) * viewport.height * 2,
            z: (Math.random() - 0.5) * 10 - 5,
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * 100,
            wingSpeed: Math.random() * 0.2 + 0.1,
        }));
    }, [count, viewport]);

    useFrame((state) => {
        if (!meshRef.current) return;

        bats.forEach((bat, i) => {
            const t = state.clock.getElapsedTime();

            // Move bat across screen
            bat.x += bat.speed * Math.sin(t * 0.1 + bat.offset);
            bat.y += Math.sin(t * 0.5 + bat.offset) * 0.02;

            // Wrap around
            if (bat.x > viewport.width / 1.5) bat.x = -viewport.width / 1.5;

            // Update dummy object
            dummy.position.set(bat.x, bat.y, bat.z);

            // Flapping rotation (simple wobble for now, rigorous wing flap requires bones or shader)
            dummy.rotation.z = Math.sin(t * 10 + bat.offset) * 0.2;
            dummy.rotation.y = Math.PI / 2 + Math.sin(t * 0.5) * 0.2; // Face direction

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
            <coneGeometry args={[0.05, 0.2, 3]} /> {/* Simple shape substitute for bat */}
            <meshStandardMaterial color="#111" roughness={0.9} />
        </instancedMesh>
    );
};

export default function Bats() {
    return (
        <group>
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="blue" />
            <BatInstances />
        </group>
    );
}
