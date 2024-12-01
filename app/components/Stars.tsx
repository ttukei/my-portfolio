import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Stars = () => {
  const group = useRef<THREE.Group>(null)
  const particles = useRef<THREE.Points | null>(null)

  useEffect(() => {
    const vertices = []
    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000)
      const y = THREE.MathUtils.randFloatSpread(2000)
      const z = THREE.MathUtils.randFloatSpread(2000)
      vertices.push(x, y, z)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 }) // Changed color to gold
    const points = new THREE.Points(geometry, material)
    if (group.current) {
      group.current.add(points)
      particles.current = points
      console.log('Stars added to the scene')
    }
  }, [])

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.001
    }
  })

  return <group ref={group} position={[0, 0, 0]} />
}

export default Stars