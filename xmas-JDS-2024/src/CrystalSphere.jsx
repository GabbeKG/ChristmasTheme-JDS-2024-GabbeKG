import React,{useRef} from "react";
import { Canvas,useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Circle, Box, useGLTF } from "@react-three/drei";
import * as THREE from 'three';






const CrystalSphere = () => {
    const woodTexture = useLoader(THREE.TextureLoader, '/wood.png')
    const snowTexture = useLoader(THREE.TextureLoader, '/snow.png')
    const snow2Texture = useLoader(THREE.TextureLoader, '/snow2.png')
    const reactLogo = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    console.log(reactLogo)
    //reactLogo.scene.autoRotate = true;
    
    const reactLogoRef = useRef();
    const groupRef = useRef();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y+=0.01
        }
    })
    
    return (
        <group ref={groupRef}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
                color={"#000"}
                transparent
                opacity={.2}
                
                roughness={.025}
                metalness={1}
                transmission={.55}
                thickness={.5}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0}
                envMapIntensity={1}
                depthWrite={false}
                />
            </Sphere>
            <Sphere args={[1.49, 64, 64, 0, Math.PI]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial map={snowTexture}/>
            </Sphere>
            <Circle args={[1.49, 64]} rotation={[Math.PI / -2, 0, 0]} position={[0, 0, 0]}>
                <meshBasicMaterial map={snow2Texture}/>
            </Circle>
            
            <Box args={[2.8, .8, 2.8]} position={[0,-1.2,0]}>
                <meshBasicMaterial
                    color={"#633c14"}
                    map={woodTexture}
                />
            </Box>
            <Environment preset="night" />
            <OrbitControls autoRotate={ false} />
            <primitive object={reactLogo.scene} scale={.05} position={[0, 0, 0]} />
            
                </group>
    )
}

export default CrystalSphere;