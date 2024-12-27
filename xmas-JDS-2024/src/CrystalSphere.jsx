/* eslint-disable react/no-unknown-property */
import {useRef, useMemo, useState, useEffect} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Circle, Box, useGLTF } from "@react-three/drei";
import * as THREE from 'three';


const SnowGlobeEffect = ({ extraSnowflakes }) => {
    const snowRef = useRef();
    const particleCount = 250;
    const maxParticles = particleCount + 500; // Preallocate buffer for 500 extra snowflakes
    const [currentParticles, setCurrentParticles] = useState(particleCount);
    const positions = useRef(new Float32Array(maxParticles * 3));
  
    // Initialize positions for the initial particles
    useEffect(() => {
      for (let i = 0; i < particleCount; i++) {
        initializeParticle(i);
      }
    }, []);
  
    // Add extra snowflakes dynamically
    useEffect(() => {
        if (extraSnowflakes > 0) {
          let added = 0;
          const increment = 10; // Add 10 particles per frame
          const interval = setInterval(() => {
            const newParticleCount = Math.min(currentParticles + increment, maxParticles);
            for (let i = currentParticles; i < newParticleCount; i++) {
              initializeParticle(i); // Initialize new particles
            }
            setCurrentParticles(newParticleCount);
            added += increment;
            if (added >= extraSnowflakes || newParticleCount === maxParticles) clearInterval(interval);
          }, 600000);
      
          return () => clearInterval(interval);
        }
      }, [extraSnowflakes]);
      
  
    // Initialize a single particle at the given index
    const initializeParticle = (index) => {
        const radius = 1.45; // Maximum radius of the globe
        const r = Math.cbrt(Math.random()) * radius; // Uniform distribution within the sphere
        const theta = Math.random() * Math.PI * 2; // Random angle around the sphere
        const phi = Math.acos(1 - 2 * Math.random()); // Random vertical angle
      
        // Convert spherical to Cartesian coordinates
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta) + radius * 0.05; // Center particles in the top half
        const z = r * Math.cos(phi);
      
        // Assign the calculated positions
        positions.current[index * 3] = x;
        positions.current[index * 3 + 1] = y;
        positions.current[index * 3 + 2] = z;
      };
      
      
      
  
    // Animate the particles
    useFrame(() => {
        if (!snowRef.current) return;
      
        const posArray = positions.current;
        const radius = 1.5; // Radius of the globe
      
        for (let i = 0; i < currentParticles; i++) {
          const x = posArray[i * 3];
          const y = posArray[i * 3 + 1];
          const z = posArray[i * 3 + 2];
      
          // Update positions: falling motion
          posArray[i * 3 + 1] -= 0.01; // Snowflake falls along Y-axis
      
          // Check if the snowflake has exited the globe
          const distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
          if (distanceFromCenter > radius || y < -radius) {
            initializeParticle(i); // Reset particle position
          }
        }
      
        // Notify Three.js of the updated positions
        snowRef.current.geometry.attributes.position.needsUpdate = true;
      });
      
      
      
      useFrame(() => {
        const posArray = positions.current;
      
        for (let i = 0; i < currentParticles; i++) {
          const x = posArray[i * 3];
          const y = posArray[i * 3 + 1];
          const z = posArray[i * 3 + 2];
      
          if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
            console.error(`Invalid particle at index ${i}: x=${x}, y=${y}, z=${z}`);
            initializeParticle(i); // Reset invalid particle
          }
        }
      });
       
  
    return (
      <points ref={snowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxParticles}
            array={positions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          map={useLoader(THREE.TextureLoader, "/snowflake.png")}
          transparent
        />
      </points>
    );
  };
  
  




const CrystalSphere = () => {

    const [extraSnowflakes, setExtraSnowflakes] = useState(0)
    
    
    const handleShake = () => {
        console.log('clicked!');
        
        setExtraSnowflakes((prev) => prev + 300); // Add 300 new snowflakes
      };
      
  const woodTexture = useLoader(THREE.TextureLoader, '/textures/pine_bark_diff_4k.jpg')
  //const normalWoodTexture =useLoader(THREE.TextureLoader, '/textures/pine_bark_nor_gl_4k.png')
  //const roughWoodTexture = useLoader(THREE.TextureLoader, '/textures/pine_bark_rough_4k.png')
  //const dispWoodTexture = useLoader(THREE.TextureLoader, '/textures/pine_bark_disp_4k.png')
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
      <group ref={groupRef} onClick={handleShake}>
        
        <pointLight intensity={1} color={"000"} />
        <Sphere args={[1.5, 64, 64]} castShadow position={[0, 0, 0]}>
            <meshPhysicalMaterial
                color={"#ce8fff"}
                transparent
                opacity={.25}
                
                roughness={.05}
                metalness={.05}
                transmission={.05}
                thickness={1.05}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0}
                envMapIntensity={1}
                depthWrite={false}
                />
            </Sphere>
            <Sphere args={[1.49, 64, 64, 0, Math.PI]} position={[0, 0, 0]} receiveShadow castShadow rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial map={snowTexture}/>
            </Sphere>
            <Circle args={[1.49, 64]} rotation={[Math.PI / -2, 0, 0]} castShadow position={[0, 0, 0]}>
                <meshBasicMaterial map={snow2Texture}/>
            </Circle>
            
            <SnowGlobeEffect extraSnowflakes={ extraSnowflakes } />
            <Box args={[2.8, .8, 2.8]} receiveShadow position={[0,-1.2,0]}>
                <meshStandardMaterial
                    
            map={woodTexture}
            
            displacementScale={0}
            
                />
            </Box>
            <Environment preset="night" environmentIntensity={.2} />
            <OrbitControls autoRotate={false} />
            
            <primitive object={reactLogo.scene} scale={.05} castShadow position={[0, 0, 0]} />
            <primitive object={star.scene} scale={.15} position={[0, 1.35, -0.055]} />
            <pointLight position={[0,1.45,-0.06]} intensity={1} distance={1}/>
            <Sphere args={[.03, 32, 32]} position={[0.1, 1.02, 0]}>
                <pointLight
                    intensity={.25}
                    color={"#f00"}/>
                <meshPhysicalMaterial
                    color={"#ff0000"}
                    transmission={.35}
                    metalness={0}
                    roughness={.025}
                    thickness={.2}
                    clearcoat={1}
                    transparent
                    opacity={.9}
                    ior={1.5}
                    envMapIntensity={1}
                />
        </Sphere>
        <Sphere args={[.03, 32, 32]} position={[-0.01, .5, .17]}>
                <pointLight
                    intensity={.25}
                    color={"#f00"}/>
                <meshPhysicalMaterial
                    color={"#ff0000"}
                    transmission={.35}
                    metalness={0}
                    roughness={.025}
                    thickness={.2}
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
                    metalness={0}
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
                    metalness={0}
                    roughness={.025}
                    thickness={.5}
                    clearcoat={1}
                    transparent
                    opacity={.9}
                    ior={1.5}
                    envMapIntensity={1}
                />
        </Sphere>
        <Sphere args={[.03, 32, 32]} position={[-0.01, .75, .15]}>
                <pointLight
                    intensity={.25}
                    color={"#00f"}/>
                <meshPhysicalMaterial
                    color={"#f0f"}
                    transmission={.35}
                    metalness={0}
                    roughness={.025}
                    thickness={.2}
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
                    metalness={0}
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