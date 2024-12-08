import React,{useRef} from "react";
import { Canvas,useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Circle, useGLTF } from "@react-three/drei";






const CrystalSphere = () => {
    const reactLogo = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    console.log(reactLogo)
    //reactLogo.scene.autoRotate = true;
    
    const reactLogoRef = useRef();
    
    return (
        <>
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
                
            </Sphere>
            <Circle args={[1.49, 64]} rotation={[Math.PI / -2, 0, 0]} position={[0, 0, 0]}>
        
      </Circle>
            <Environment preset="night" />
            
            <primitive object={reactLogo.scene} scale={.05} position={[0, 0, 0]} />
            <OrbitControls ref={reactLogoRef} autoRotate/>
                </>
    )
}

export default CrystalSphere;