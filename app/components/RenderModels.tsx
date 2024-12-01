'use client'
import React, { Suspense, useRef } from 'react';
import { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';
import { Environment, PerspectiveCamera } from '@react-three/drei';


interface Props {
    children?: ReactNode;
    className?: string;
}

const AllSeeingEyeModel: React.FC<Props> = ({ children, className }) => {
    const modelRef = useRef<any>();

    return (
        <Canvas style={{ background: 'black' }} className={clsx("w-screen h-screen -z-10 relative", className)}>
            <Suspense fallback={null}>
                <group ref={modelRef}>
                    {children}
                </group>
            </Suspense>
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
        </Canvas>
    );
}

export default AllSeeingEyeModel;
