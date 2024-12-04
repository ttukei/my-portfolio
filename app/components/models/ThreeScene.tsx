import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.038); // Initial rotation speed
  const [isSlowingDown, setIsSlowingDown] = useState(false); // State to manage slowing down

  // Load the GLTF model with Draco compression
  const { scene } = useGLTF('/models/scene-transformed.glb', 'https://www.gstatic.com/draco/v1/decoders/');
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/models/metal_plate_02_8k.gltf');

  // Apply the texture to the model's materials
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => {
            const standardMaterial = material as THREE.MeshStandardMaterial;
            standardMaterial.map = texture;
            standardMaterial.roughness = 0.5; // Adjust roughness
            standardMaterial.metalness = 2; // Adjust metalness
            standardMaterial.needsUpdate = true;
          });
        } else {
          const standardMaterial = mesh.material as THREE.MeshStandardMaterial;
          standardMaterial.map = texture;
          standardMaterial.roughness = 0.5; // Adjust roughness
          standardMaterial.metalness = 2; // Adjust metalness
          standardMaterial.needsUpdate = true;
        }
      }
    }
  });

  useEffect(() => {
    if (modelRef.current) {
      // Center the pivot point
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      modelRef.current.position.sub(center);
      if (groupRef.current) {
        groupRef.current.position.copy(center);
      }
    }
  }, [scene]);

  // Rotate the model along all of its axes on each frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed; // Use the rotation speed state
    }
  });

  const { camera } = useThree();
  useEffect(() => {
    // Position the camera to view the centered model
    camera.position.set(0, 17, 30.8);
  }, [camera]);

  const handleClick = () => {
    setRotationSpeed(rotationSpeed + 0.05); // Increase the rotation speed on click
    setIsSlowingDown(true); // Start slowing down
  };

  useEffect(() => {
    if (isSlowingDown) {
      const interval = setInterval(() => {
        setRotationSpeed((prevSpeed) => Math.max(prevSpeed - 0.001, 0.038)); // Gradually decrease the speed
      }, 100);

      return () => clearInterval(interval); // Clear the interval when the component unmounts or isSlowingDown changes
    }
  }, [isSlowingDown]);

  useEffect(() => {
    if (rotationSpeed > 0.2) {
      setRotationSpeed(0.1); // Cap the rotation speed
    }
  }, [rotationSpeed]);

  return (
    <group ref={groupRef} onClick={handleClick}>
      <primitive object={scene} ref={modelRef} />
    </group>
  );
};

const ThreeScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={30} />
      <Model />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ThreeScene;
