/* eslint-disable react/no-unknown-property */
import {useRef, useMemo} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Circle, Box, useGLTF } from "@react-three/drei";
import * as THREE from 'three';


const SnowGlobeEffect = () => {
    const snowRef = useRef();
  
    const snowParticles = useMemo(() => {
        const particles = [];
        const count = 2000; // Number of snowflakes
        const radius = 1.45; // Slightly smaller than the inner sphere radius
      
        for (let i = 0; i < count; i++) {
          // Random spherical coordinates
          const theta = Math.random() * Math.PI * 2; // Random angle around the sphere
          const phi = Math.acos(3 * Math.random() - 1); // Random angle for vertical distribution
          const r = Math.cbrt(Math.random()) * radius; // Cubic root for uniform volume distribution
      
          // Convert spherical to Cartesian coordinates
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.sin(phi) * Math.sin(theta);
          const z = r * Math.cos(phi);
      
          // Add to particle array
          particles.push(new THREE.Vector3(x, y, z));
        }
        return particles;
      }, []);
  
      useFrame(() => {
        if (!snowRef.current) return;
      
        const positions = snowRef.current.geometry.attributes.position.array;
      
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= 0.01; // Fall along Y-axis
      
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];
          const radius = 1.5;
      
          // Reset to random position when outside sphere
          if (Math.sqrt(x * x + y * y + z * z) > radius) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.cbrt(Math.random()) * radius;
      
            positions[i] = r * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = r * Math.cos(phi);
          }
        }
      
        snowRef.current.geometry.attributes.position.needsUpdate = true;
      });
    return (
      <points ref={snowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={snowParticles.length}
            array={new Float32Array(
              snowParticles.flatMap((v) => [v.x, v.y, v.z])
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          map={useLoader(THREE.TextureLoader, "/snowflake.png")} // Replace with your snowflake texture
          transparent
        />
      </points>
    );
  };




const CrystalSphere = () => {
    const woodTexture = useLoader(THREE.TextureLoader, '/wood.png')
    const snowTexture = useLoader(THREE.TextureLoader, '/snow.png')
    const snow2Texture = useLoader(THREE.TextureLoader, '/snow2.png')
    const star= useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf')
    const reactLogo = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    useGLTF.preload("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/star/model.gltf")
    console.log(reactLogo)
    //reactLogo.scene.autoRotate = true;
    
    
    const groupRef = useRef();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y+=0.005
        }
    })
    
    return (
        <group ref={groupRef}>
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
                color={"#ce8fff"}
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
            
                <SnowGlobeEffect />
            <Box args={[2.8, .8, 2.8]} position={[0,-1.2,0]}>
                <meshBasicMaterial
                    color={"#633c14"}
                    map={woodTexture}
                />
            </Box>
            <Environment preset="night" environmentIntensity={.2} />
            <OrbitControls autoRotate={false} />
            
            <primitive object={reactLogo.scene} scale={.05} position={[0, 0, 0]} />
            <primitive object={star.scene} scale={.15} position={[0, 1.35, -0.055]} />
            <pointLight position={[0,1.45,-0.06]} intensity={1} distance={1}/>
            <Sphere args={[.03, 32, 32]} position={[0.1, 1.02, 0]}>
                <pointLight
                    intensity={.25}
                    color={"#f00"}/>
                <meshPhysicalMaterial
                    color={"#ff0000"}
                    transmission={.55}
                    metalness={2}
                    roughness={.025}
                    thickness={.5}
                    clearcoat={1}
                    transparent
                    opacity={.9}
                    ior={1.5}
                    envMapIntensity={1}
                />
            </Sphere>
            <Sphere args={[.03, 32, 32]} position={[-0.15, .85, 0]}>
                <pointLight
                    color={"#0f0"}
                    intensity={.25}/>
                <meshPhysicalMaterial
                    color={"#00ff00"}
                    transmission={.55}
                    metalness={2}
                    roughness={.025}
                    thickness={.5}
                    clearcoat={1}
                    transparent
                    opacity={.9}
                    ior={1.5}
                    envMapIntensity={1}
                />
            </Sphere>
            <Sphere args={[.03, 32, 32]} position={[-0.15, .7, -.2]}>
                <pointLight
                    color={"#00f"}
                    intensity={.25}/>
                <meshPhysicalMaterial
                    color={"#0000ff"}
                    transmission={.55}
                    metalness={2}
                    roughness={.025}
                    thickness={.5}
                    clearcoat={1}
                    transparent
                    opacity={.9}
                    ior={1.5}
                    envMapIntensity={1}
                />
            </Sphere>
            <Sphere args={[.03, 32, 32]} position={[0.15, .5, -.2]}>
                <pointLight
                    color={"#0f0"}
                    intensity={.25}/>
                <meshPhysicalMaterial
                    color={"#00ff00"}
                    transmission={.55}
                    metalness={2}
                    roughness={.025}
                    thickness={.5}
                    clearcoat={1}
                    transparent
                    opacity={.9}
                    ior={1.5}
                    envMapIntensity={1}
                />
            </Sphere>
                </group>
    )
}

export default CrystalSphere;