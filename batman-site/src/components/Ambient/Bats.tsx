import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Creates a simplified bat silhouette as a BufferGeometry.
 * The shape is a flat 2D extrusion: two swept wings + a small head bump.
 */
function createBatGeometry(): THREE.BufferGeometry {
    const shape = new THREE.Shape();

    // Center body
    shape.moveTo(0, 0.02);

    // Right wing — sweeping curve
    shape.quadraticCurveTo(0.04, 0.03, 0.1, 0.06);   // upper edge
    shape.quadraticCurveTo(0.14, 0.04, 0.16, 0.0);    // wing tip dip
    shape.quadraticCurveTo(0.12, 0.02, 0.09, -0.01);  // scallop 1
    shape.quadraticCurveTo(0.1, -0.02, 0.12, -0.03);  // scallop 2
    shape.quadraticCurveTo(0.08, -0.01, 0.05, -0.02); // inner scallop
    shape.quadraticCurveTo(0.02, -0.01, 0, -0.02);    // back to center bottom

    // Left wing — mirror
    shape.quadraticCurveTo(-0.02, -0.01, -0.05, -0.02);
    shape.quadraticCurveTo(-0.08, -0.01, -0.12, -0.03);
    shape.quadraticCurveTo(-0.1, -0.02, -0.09, -0.01);
    shape.quadraticCurveTo(-0.12, 0.02, -0.16, 0.0);
    shape.quadraticCurveTo(-0.14, 0.04, -0.1, 0.06);
    shape.quadraticCurveTo(-0.04, 0.03, 0, 0.02);

    // Small ear/head bumps
    const headShape = new THREE.Shape();
    headShape.moveTo(-0.015, 0.02);
    headShape.lineTo(-0.01, 0.04);
    headShape.lineTo(0, 0.025);
    headShape.lineTo(0.01, 0.04);
    headShape.lineTo(0.015, 0.02);

    const bodyGeo = new THREE.ShapeGeometry(shape);
    const headGeo = new THREE.ShapeGeometry(headShape);

    // Merge the two geometries
    const merged = new THREE.BufferGeometry();
    const bodyPos = bodyGeo.getAttribute('position');
    const headPos = headGeo.getAttribute('position');

    const totalVerts = bodyPos.count + headPos.count;
    const positions = new Float32Array(totalVerts * 3);
    for (let i = 0; i < bodyPos.count; i++) {
        positions[i * 3] = bodyPos.getX(i);
        positions[i * 3 + 1] = bodyPos.getY(i);
        positions[i * 3 + 2] = bodyPos.getZ(i);
    }
    for (let i = 0; i < headPos.count; i++) {
        const offset = bodyPos.count + i;
        positions[offset * 3] = headPos.getX(i);
        positions[offset * 3 + 1] = headPos.getY(i);
        positions[offset * 3 + 2] = headPos.getZ(i);
    }
    merged.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Merge index buffers
    const bodyIndex = bodyGeo.getIndex();
    const headIndex = headGeo.getIndex();
    if (bodyIndex && headIndex) {
        const totalIndices = bodyIndex.count + headIndex.count;
        const indices = new Uint16Array(totalIndices);
        for (let i = 0; i < bodyIndex.count; i++) {
            indices[i] = bodyIndex.getX(i);
        }
        for (let i = 0; i < headIndex.count; i++) {
            indices[bodyIndex.count + i] = headIndex.getX(i) + bodyPos.count;
        }
        merged.setIndex(new THREE.BufferAttribute(indices, 1));
    }

    bodyGeo.dispose();
    headGeo.dispose();

    return merged;
}

interface BatParticle {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    speed: number;
    flapSpeed: number;
    flapAmplitude: number;
    yawOffset: number;
    pitchOffset: number;
    phase: number;
    scale: number;
}

const BatSwarm = ({ count = 100 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const batGeo = useMemo(() => createBatGeometry(), []);

    // Spread bounds based on viewport — generous margins so bats fill the screen
    const spreadX = viewport.width * 1.5;
    const spreadY = viewport.height * 1.5;

    const bats = useMemo<BatParticle[]>(() => {
        return new Array(count).fill(0).map(() => {
            // Randomise initial direction: mostly drifting left-to-right or right-to-left
            const dir = Math.random() > 0.5 ? 1 : -1;
            return {
                x: (Math.random() - 0.5) * spreadX,
                y: (Math.random() - 0.5) * spreadY,
                z: (Math.random() - 0.5) * 8 - 3,
                vx: dir * (Math.random() * 0.008 + 0.003),
                vy: (Math.random() - 0.5) * 0.004,
                speed: Math.random() * 0.006 + 0.002,
                flapSpeed: Math.random() * 6 + 4,       // wing-flap frequency
                flapAmplitude: Math.random() * 0.4 + 0.2, // wing-flap pitch range
                yawOffset: Math.random() * Math.PI * 2,
                pitchOffset: Math.random() * Math.PI * 2,
                phase: Math.random() * 100,
                scale: Math.random() * 1.5 + 1.2, // Increased scale so bats are visible
            };
        });
    }, [count, spreadX, spreadY]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        bats.forEach((bat, i) => {
            // Drift movement
            bat.x += bat.vx;
            bat.y += bat.vy + Math.sin(t * 0.5 + bat.phase) * 0.002;

            // Wrap around when leaving view bounds
            const boundX = spreadX * 0.6;
            const boundY = spreadY * 0.6;
            if (bat.x > boundX) bat.x = -boundX;
            if (bat.x < -boundX) bat.x = boundX;
            if (bat.y > boundY) bat.y = -boundY;
            if (bat.y < -boundY) bat.y = boundY;

            dummy.position.set(bat.x, bat.y, bat.z);

            // Wing-flap: oscillating pitch to simulate flapping
            const flap = Math.sin(t * bat.flapSpeed + bat.phase) * bat.flapAmplitude;
            // Gentle yaw drift so they don't all face the same way
            const yaw = Math.sin(t * 0.3 + bat.yawOffset) * 0.3;

            dummy.rotation.set(
                flap,                                         // pitch (wing flap)
                yaw + (bat.vx > 0 ? 0 : Math.PI),           // yaw (face direction of travel)
                Math.sin(t * 0.2 + bat.pitchOffset) * 0.15   // slight roll
            );

            dummy.scale.setScalar(bat.scale);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[batGeo, undefined, count]}>
            <meshBasicMaterial
                color="#00d2ff" // Switched to lux-accent color for stronger neon glow
                transparent
                opacity={0.9} // increased opacity
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
};

export default function NeonBats() {
    return (
        <group>
            <BatSwarm />
        </group>
    );
}
