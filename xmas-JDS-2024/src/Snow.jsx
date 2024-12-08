import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Snow = () => {
  const pointsRef = useRef();

  // Load the snowflake texture
  const texture = useLoader(THREE.TextureLoader, '/snowflake.png');

  // Generate random snowflake positions
  const snowflakes = useMemo(() => {
    const particles = new Float32Array(2000 * 3); // 2000 snowflakes
    for (let i = 0; i < particles.length; i++) {
      particles[i] = (Math.random() - 0.5) * 100; // Spread in a large area
    }
    return particles;
  }, []);

  // Animate snow falling
  useFrame(() => {
    const points = pointsRef.current;

    // Check if the points geometry is ready
    if (!points || !points.geometry || !points.geometry.attributes.position) {
      return; // Exit early until geometry is initialized
    }

    const positions = points.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.1; // Move snowflake down (y-axis)

      // Reset snowflake to top when it falls below the bottom
      if (positions[i + 1] < -50) {
        positions[i + 1] = 50; // Reset to top
      }
    }

    points.geometry.attributes.position.needsUpdate = true;
  });

    return (
      
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={snowflakes}
          count={snowflakes.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture} // Use the PNG texture
        size={1} // Adjust snowflake size
        sizeAttenuation
        transparent
        alphaTest={0.5} // Ensure transparency works
        opacity={0.9} // Adjust opacity
      />
    </points>
  );
};

export default Snow;
