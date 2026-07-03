import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const carImageRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects for content
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  // Car movement - moves forward as you scroll down
  const carX = useTransform(scrollYProgress, [0, 1], [0, 400])
  const carY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const carScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2])
  const carOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.7, 0])


  // Car image angles - 5 different cars
  const carImages = [
    '/car1.jpg',
    '/car2.jpg',
    '/car3.jpg',
    '/car4.jpg',
    '/car5.jpg'
  ]


  // Cross-fade between car angles on scroll (5 cars)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.2) {
        setCurrentImageIndex(0)
      } else if (latest < 0.4) {
        setCurrentImageIndex(1)
      } else if (latest < 0.6) {
        setCurrentImageIndex(2)
      } else if (latest < 0.8) {
        setCurrentImageIndex(3)
      } else {
        setCurrentImageIndex(4)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // GSAP entrance animation - faster
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })

    tl.from('.hero-car-container', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
    .from(['.car-light-left', '.car-light-right'], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.1
    }, '-=0.6')
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Background with grain */}
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-grain"></div>
      </div>

      <motion.div className="hero-content" style={{ y, opacity }}>
        {/* Stats Bar */}
        <motion.div
          className="hero-specs"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="spec-item"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.span
              className="spec-value"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              15K+
            </motion.span>
            <span className="spec-label">VEHICLES SERVICED</span>
          </motion.div>
          <div className="spec-divider"></div>
          <motion.div
            className="spec-item"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.span
              className="spec-value"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              98%
            </motion.span>
            <span className="spec-label">SATISFACTION RATE</span>
          </motion.div>
          <div className="spec-divider"></div>
          <motion.div
            className="spec-item"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.span
              className="spec-value"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              50+
            </motion.span>
            <span className="spec-label">EXPERT TECHNICIANS</span>
          </motion.div>
        </motion.div>

        {/* Car Visual with Scroll Parallax */}
        <motion.div
          className="hero-car-container"
          ref={carImageRef}
          style={{
            x: carX,
            y: carY,
            scale: carScale,
            opacity: carOpacity
          }}
        >
          {/* Studio Lights Effect */}
          <div className="car-light-left"></div>
          <div className="car-light-right"></div>

          {/* Car Images with Cross-fade and Mouse Parallax */}
          {carImages.map((image, index) => (
            <motion.div
              key={index}
              className="hero-car-image-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                position: index > 0 ? 'absolute' : 'relative'
              }}
            >
              <img
                src={image}
                alt={`Elite Auto Lab - Premium Car ${index + 1}`}
                className="hero-car-image"
                onError={(e) => {
                  e.target.src = '/car-placeholder.svg'
                }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </motion.div>
          ))}

          {/* Reflection */}
          <div className="car-reflection"></div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['WHERE PRECISION', 'MEETS POWER'].map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              {line}
            </motion.div>
          ))}
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          ENGINEERING EXCELLENCE IN EVERY SERVICE
        </motion.p>

        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <motion.a
            href="#booking"
            className="btn-primary"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(204,0,0,0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            COMMISSION SERVICE
          </motion.a>
          <motion.a
            href="#services"
            className="btn-secondary"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(192,192,192,0.2)",
              borderColor: "#c0c0c0"
            }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE SERVICES
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-philosophy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            "WHERE THE PAST OVERTAKES THE FUTURE"
          </motion.p>
          <motion.p
            className="philosophy-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            CONTROLLED CHAOS. MECHANICAL OBSESSION. PERFORMANCE EXTREMISM.
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        className="scroll-indicator"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL
        </motion.span>
        <ChevronDown size={24} />
      </motion.a>
    </section>
  )
}

export default Hero
