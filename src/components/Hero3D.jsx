/**
 * Hero3D Component - Premium Cinematic 3D Hero Section
 * Features:
 * - Real 3D Pagani Zonda R model (.glb)
 * - Mouse-controlled 360° rotation
 * - Touch support for mobile devices
 * - Premium studio lighting
 * - Scroll-triggered animations
 * - Fully responsive
 */

import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './Hero3D.css'

// 3D model from public folder - Vercel will serve it directly
const paganModel = '/pagani-zonda-r.glb'

/**
 * 3D Car Model Component
 * Loads and displays the Hummer H3 with mouse interaction
 */
function CarModel({ mousePosition, scrollProgress, onLoaded }) {
  const carRef = useRef()
  const gltf = useGLTF("/hummer-h3.glb")

  // Setup model on load
  useEffect(() => {
    if (gltf && gltf.scene) {
      console.log('GLTF Model loaded:', gltf)

      // Traverse and enhance materials
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true

          if (child.material) {
            child.material.envMapIntensity = 1.5
            child.material.metalness = 0.9
            child.material.roughness = 0.2
            child.material.needsUpdate = true
          }
        }
      })

      // Center and scale
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      gltf.scene.position.x = -center.x
      gltf.scene.position.y = -center.y
      gltf.scene.position.z = -center.z

      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2.5 / maxDim
      gltf.scene.scale.setScalar(scale)

      // Notify loaded
      if (onLoaded) {
        onLoaded()
      }
    }
  }, [gltf, onLoaded])

  // Animate
  useFrame((state, delta) => {
    if (carRef.current && mousePosition.current) {
      const targetRotationY = mousePosition.current.x * Math.PI * 0.5
      const targetRotationX = mousePosition.current.y * Math.PI * 0.1

      carRef.current.rotation.y += (targetRotationY - carRef.current.rotation.y) * 0.05
      carRef.current.rotation.x += (targetRotationX - carRef.current.rotation.x) * 0.05
      carRef.current.rotation.y += delta * 0.1
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={carRef}>
      <primitive object={gltf.scene} />
    </group>
  )
}

/**
 * 3D Scene Component
 * Sets up camera, lights, environment, and the car model
 */
function Scene({ mousePosition, scrollProgress, onModelLoaded }) {
  return (
    <>
      {/* Main Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.5} />

      {/* Key Light - Main light source from front-right */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill Light - Softens shadows from left */}
      <spotLight
        position={[-10, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1}
      />

      {/* Back Light - Creates rim lighting */}
      <spotLight
        position={[0, 5, -10]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
      />

      {/* Top Light - Highlights from above */}
      <pointLight position={[0, 10, 0]} intensity={0.8} />

      {/* HDR Environment for reflections */}
      <Environment preset="city" />

      {/* Ground Shadow */}
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />

      {/* Car Model */}
      <Suspense fallback={null}>
        <CarModel
          mousePosition={mousePosition}
          scrollProgress={scrollProgress}
          onLoaded={onModelLoaded}
        />
      </Suspense>
    </>
  )
}

/**
 * Loading Fallback Component
 */
function LoadingFallback() {
  return (
    <div className="hero3d-loading">
      <div className="loading-spinner"></div>
      <p>LOADING 3D EXPERIENCE...</p>
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
      <p style={{ fontSize: '0.65rem', marginTop: '15px', opacity: 0.6 }}>
        Click anywhere to continue
      </p>
    </div>
  )
}

/**
 * Error Fallback Component
 */
function ErrorFallback() {
  return (
    <div className="hero3d-loading">
      <p style={{ color: '#cc0000', marginBottom: '15px' }}>
        3D MODEL UNAVAILABLE
      </p>
      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
        Premium workshop experience continues below
      </p>
    </div>
  )
}

/**
 * Main Hero3D Component
 */
const Hero3D = () => {
  const heroRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [isCanvasReady, setIsCanvasReady] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1])

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mousePosition.current = { x, y }
    }

    // Touch movement handler
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        const y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
        mousePosition.current = { x, y }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.from('.hero3d-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero3d-subtitle', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero3d-cta', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero3d-specs', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
  }, [])

  // Handle model loaded callback
  const handleModelLoaded = () => {
    console.log('3D Model loaded successfully')
    setIsModelLoaded(true)
    setHasError(false)
  }

  // Safety timeout - if model doesn't load in 8 seconds, show error
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!isModelLoaded && !hasError) {
        console.warn('Model loading timeout - showing error fallback')
        setHasError(true)
        setIsModelLoaded(true) // Hide loading spinner
      }
    }, 8000) // 8 second timeout

    return () => clearTimeout(safetyTimer)
  }, [isModelLoaded, hasError])

  // Click to skip loader
  const handleSkipLoader = () => {
    if (!isModelLoaded) {
      console.log('User skipped loader')
      setIsModelLoaded(true)
    }
  }

  return (
    <section className="hero3d" id="hero3d" ref={heroRef}>
      {/* Background gradient */}
      <div className="hero3d-background">
        <div className="hero3d-gradient"></div>
        <div className="hero3d-grain"></div>
      </div>

      {/* 3D Canvas Container */}
      <motion.div
        className="hero3d-canvas-wrapper"
        style={{ y, opacity, scale }}
        onClick={handleSkipLoader}
      >
        {!hasError ? (
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.2
            }}
            dpr={[1, 2]}
            onCreated={() => {
              console.log('Canvas created')
              setIsCanvasReady(true)
            }}
            onError={(error) => {
              console.error('Canvas error:', error)
              setHasError(true)
              setIsModelLoaded(true)
            }}
          >
            <Scene
              mousePosition={mousePosition}
              scrollProgress={scrollYProgress}
              onModelLoaded={handleModelLoaded}
            />
          </Canvas>
        ) : (
          <ErrorFallback />
        )}

        {!isModelLoaded && !hasError && <LoadingFallback />}
      </motion.div>

      {/* Content Overlay */}
      <div className="hero3d-content">
        <motion.div
          className="hero3d-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="hero3d-title">
            <span className="title-line">WHERE PRECISION</span>
            <span className="title-line highlight">MEETS PASSION</span>
            <span className="title-line">ELITE AUTO LAB</span>
          </h1>

          <p className="hero3d-subtitle">
            Master craftsmanship for automotive excellence. <br />
            Your hypercar deserves nothing less than perfection.
          </p>

          <div className="hero3d-cta-group">
            <motion.a
              href="#booking"
              className="hero3d-cta primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(204,0,0,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              SCHEDULE SERVICE
            </motion.a>

            <motion.a
              href="#services"
              className="hero3d-cta secondary"
              whileHover={{ scale: 1.05, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
            >
              OUR EXPERTISE
            </motion.a>
          </div>

          {/* Workshop Stats */}
          <div className="hero3d-specs">
            <div className="spec-item">
              <span className="spec-value">15K+</span>
              <span className="spec-label">CARS SERVICED</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-value">98%</span>
              <span className="spec-label">SATISFACTION</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-value">50+</span>
              <span className="spec-label">TECHNICIANS</span>
            </div>
            <div className="spec-divider"></div>
            <div className="spec-item">
              <span className="spec-value">24/7</span>
              <span className="spec-label">AVAILABLE</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#car-tour"
          className="hero3d-scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>SCROLL</span>
          <ChevronDown size={20} />
        </motion.a>
      </div>

      {/* Interactive hint */}
      <motion.div
        className="hero3d-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path d="M12 20 L20 20 L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 12 L20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>DRAG TO ROTATE</span>
      </motion.div>

      {/* Workshop info badge */}
      <motion.div
        className="hero3d-badge"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="badge-label">PREMIUM WORKSHOP</span>
        <span className="badge-value">ELITE AUTO LAB</span>
      </motion.div>
    </section>
  )
}

// Preload the 3D model
useGLTF.preload("/hummer-h3.glb")

export default Hero3D
