import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const groupRef = useRef<THREE.Group | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

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
      groupRef.current.rotation.x += 0.038; // Adjust the rotation speed as needed
      //groupRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
      //groupRef.current.rotation.z += 0.01; // Adjust the rotation speed as needed
    }
  });

  const { camera } = useThree();
  useEffect(() => {
    // Position the camera to view the centered model
    camera.position.set(0, 13, 30.8);
  }, [camera]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} ref={modelRef} />
    </group>
  );
};

const ThreeScene = () => {
  return (
    <Canvas className="bg-black">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={30} />
      <Model />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ThreeScene;
