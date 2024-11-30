'use client'
import React, { Suspense, useRef } from 'react';
import { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface Props {
    children?: ReactNode;
    className?: string;
}

const AllSeeingEyeModel: React.FC<Props> = ({ children, className }) => {
    const modelRef = useRef<any>();

    return (
        <Canvas className={clsx("w-screen h-screen -z-10 relative", className)}>
            <Suspense fallback={null}>
                <group ref={modelRef}>
                    {children}
                </group>
            </Suspense>

            <ambientLight intensity={1.0} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <Environment preset="city" />

            <RotateModel modelRef={modelRef} />
        </Canvas>
    );
}

const RotateModel = ({ modelRef }: { modelRef: React.RefObject<any> }) => {
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
        }
    });
    return null;
}

export default AllSeeingEyeModel;

// TODO