import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/scene-transformed.glb')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const mouseMoveTimeout = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
      setIsMouseMoving(true)

      // Clear the previous timeout and set a new one
      clearTimeout(mouseMoveTimeout.current)
      mouseMoveTimeout.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 1000) // Adjust the timeout duration as needed
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(mouseMoveTimeout.current)
    }
  }, [])

  useFrame(({ camera }) => {
    if (group.current) {
      if (isMouseMoving) {
        // Convert mouse position to 3D coordinates with increased intensity
        const vector = new THREE.Vector3(mouse.x * 0.009, mouse.y * 0.009, 0.96).unproject(camera) // Adjust the multiplication factor to increase intensity
        group.current.lookAt(vector)
      } else {
        // Animate back to original position
        gsap.to(group.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: 'power2.out'
        })
      }
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials['Material.002']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.025}
      />
    </group>
  )
}

useGLTF.preload('/models/scene-transformed.glb')