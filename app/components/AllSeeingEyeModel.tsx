import React, { Suspense } from 'react';
import { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';

interface Props {
    children?: ReactNode;
    className?: string;
}

const AllSeeingEyeModel: React.FC<Props>= ({children, className}) => {
    
    return (
        <Canvas className={clsx("w-screen h-screen relative", className)}>
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </Canvas>
    )
}

export default AllSeeingEyeModel;

// TODO 