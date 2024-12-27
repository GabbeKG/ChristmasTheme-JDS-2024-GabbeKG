
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import Snow from "./Snow"
import CrystalSphere from "./CrystalSphere"
const StarrySky = () => {
    const pointsRef = useRef();

    const generateStars = (count = 5000) => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - .5) * 100;
        }
        return positions;
    };

    

    return (
        <Canvas
        camera={{position:[0,2,5]}}
        >
            <directionalLight position={[30, 70, 20]} intensity={1} />
            
            
<pointLight position={[-2, -2, -2]} intensity={0.5} color={'white'} />

            <color attach="background" args={['#000011']} />
            {<Snow />}

            <CrystalSphere />
            

            <Points ref={pointsRef} positions={generateStars()} stride={3}>
                <PointMaterial
                    transparent
                    color="#fff"
                    size={.03}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </Canvas>
    )
};

export default StarrySky;