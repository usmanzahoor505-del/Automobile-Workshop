import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import './Hero3D.css'
import './Hero3DSimple.css'

function CarModel() {
  const groupRef = useRef()
  const gltf = useGLTF("/hummer-h3.glb")

  useEffect(() => {
    if (!gltf?.scene) return

    // Reset any transforms
    gltf.scene.rotation.set(0, 0, 0)
    gltf.scene.position.set(0, 0, 0)
    gltf.scene.scale.set(1, 1, 1)

    const box = new THREE.Box3().setFromObject(gltf.scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    console.log('RAW size:', size.x.toFixed(1), size.y.toFixed(1), size.z.toFixed(1))
    console.log('RAW center:', center.x.toFixed(1), center.y.toFixed(1), center.z.toFixed(1))
    console.log('RAW min Y:', box.min.y.toFixed(1), 'max Y:', box.max.y.toFixed(1))

    // Scale to fit: longest axis = 2
    const maxDim = Math.max(size.x, size.y, size.z)
    const s = 2 / maxDim
    gltf.scene.scale.setScalar(s)

    // After scale, re-center
    const box2 = new THREE.Box3().setFromObject(gltf.scene)
    const center2 = box2.getCenter(new THREE.Vector3())

    // Position: centered X/Z, wheels at y=0
    gltf.scene.position.set(
      -center2.x,
      -box2.min.y,
      -center2.z
    )

    console.log('FINAL bounds:', box2.min.y.toFixed(2), 'to', box2.max.y.toFixed(2))

    // Materials
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.envMapIntensity = 1.5
        child.material.needsUpdate = true
      }
    })
  }, [gltf])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  if (!gltf?.scene) return null

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  )
}

const Hero3DSimple = () => {
  const [error, setError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="hero3d hero3d-simple" style={{ position: 'relative', overflow: 'visible' }}>
      <div className="hero3d-background">
        <div className="hero3d-gradient"></div>
      </div>

      {/* Text - BEHIND car (z-index 5) */}
      <div className="hero3d-content" style={{ position: 'relative', zIndex: 5, pointerEvents: 'none' }}>
        <div className="hero3d-text">
          <h1 className="hero3d-title">
            <span className="title-line">WHERE PRECISION</span>
            <span className="title-line highlight">MEETS PASSION</span>
            <span className="title-line">ELITE AUTO LAB</span>
          </h1>
          <p className="hero3d-subtitle">
            Master craftsmanship for automotive excellence.
          </p>
          <div className="hero3d-cta-group" style={{ pointerEvents: 'auto' }}>
            <motion.a
              href="#booking"
              className="hero3d-cta primary"
              whileHover={{ scale: 1.05 }}
            >
              SCHEDULE SERVICE
            </motion.a>
          </div>
        </div>
      </div>

      {/* 3D Car - IN FRONT of text (z-index 15) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 15,
        pointerEvents: 'auto'
      }}>
        {!error && (
          <Canvas
            camera={{
              position: isMobile ? [5, 2.5, 5] : [4, 2, 4],
              fov: isMobile ? 45 : 40
            }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, isMobile ? 1.5 : 2]}
            performance={{ min: 0.5 }}
            onError={() => setError(true)}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <directionalLight position={[-5, 3, -5]} intensity={1} />
            <Environment preset="studio" />
            <Suspense fallback={null}>
              <CarModel />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={1.0}
              maxPolarAngle={1.4}
              target={[0, 0.5, 0]}
            />
          </Canvas>
        )}
      </div>
    </section>
  )
}

useGLTF.preload("/hummer-h3.glb")

export default Hero3DSimple
