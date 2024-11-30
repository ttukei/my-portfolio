import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import clsx from 'clsx';

const AllSeeingEyeModel = ({children, className}) => {
    
    return (
        <Canvas className={clsx("w-screen h-screen relative", className)}>
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </Canvas>
    )
}

export default AllSeeingEyeModel;