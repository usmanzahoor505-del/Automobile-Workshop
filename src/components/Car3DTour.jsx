import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { gsap } from 'gsap'
import './Car3DTour.css'

const Car3DTour = () => {
  const [currentView, setCurrentView] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Premium car views
  const carViews = [
    {
      image: '/tour-car-front.jpg',
      title: 'EXTERIOR',
      subtitle: 'FRONT VIEW',
      description: 'Aggressive stance with aerodynamic design'
    },
    {
      image: '/tour-car-side.jpg',
      title: 'PROFILE',
      subtitle: 'SIDE VIEW',
      description: 'Sleek lines and perfect proportions'
    },
    {
      image: '/tour-car-rear.jpg',
      title: 'REAR',
      subtitle: 'BACK VIEW',
      description: 'Powerful presence with dual exhausts'
    },
    {
      image: '/tour-car-interior.jpg',
      title: 'INTERIOR',
      subtitle: 'CABIN',
      description: 'Luxurious craftsmanship and technology'
    }
  ]

  // GSAP entrance animation
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [currentView])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % carViews.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [carViews.length])

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % carViews.length)
  }

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + carViews.length) % carViews.length)
  }

  const selectView = (index) => {
    setCurrentView(index)
  }

  return (
    <section className="car-tour" id="car-tour" ref={sectionRef}>
      <motion.div className="car-tour-content" style={{ opacity }}>
        <div className="car-tour-header">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SHOWCASE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            PREMIUM AUTOMOTIVE EXCELLENCE. EVERY ANGLE PERFECTED.
          </motion.p>
        </div>

        {/* Main Car Viewer */}
        <motion.div
          className={`car-viewer ${isFullscreen ? 'fullscreen' : ''}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Studio Lights Effect */}
          <div className="studio-light left"></div>
          <div className="studio-light right"></div>

          {/* Car Image Container */}
          <div className="car-image-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                className="car-image-wrapper"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <img
                  ref={imageRef}
                  src={carViews[currentView].image}
                  alt={carViews[currentView].title}
                  className="car-image"
                  onError={(e) => e.target.src = '/car-placeholder.svg'}
                />
                {/* Image Overlay Gradient */}
                <div className="image-overlay"></div>
              </motion.div>
            </AnimatePresence>

            {/* View Info Overlay */}
            <motion.div
              className="view-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="view-subtitle">{carViews[currentView].subtitle}</span>
              <h3 className="view-title">{carViews[currentView].title}</h3>
              <p className="view-description">{carViews[currentView].description}</p>
            </motion.div>

            {/* Navigation Controls */}
            <div className="nav-controls">
              <motion.button
                className="nav-btn prev"
                onClick={prevView}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={32} />
              </motion.button>
              <motion.button
                className="nav-btn next"
                onClick={nextView}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={32} />
              </motion.button>
            </div>

            {/* Fullscreen Toggle */}
            <motion.button
              className="fullscreen-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 size={20} />
            </motion.button>

            {/* Progress Indicator */}
            <div className="progress-indicator">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentView + 1) / carViews.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Thumbnail Strip */}
          <motion.div
            className="thumbnail-strip"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {carViews.map((view, index) => (
              <motion.button
                key={index}
                className={`thumbnail ${currentView === index ? 'active' : ''}`}
                onClick={() => selectView(index)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={view.image} alt={view.subtitle} />
                <div className="thumbnail-overlay">
                  <span>{view.subtitle}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Specifications */}
        <motion.div
          className="car-specs"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="spec-grid">
            {[
              { label: 'POWER', value: '650 HP', unit: 'HORSEPOWER' },
              { label: 'ACCELERATION', value: '3.2s', unit: '0-60 MPH' },
              { label: 'TOP SPEED', value: '205', unit: 'MPH' },
              { label: 'PRECISION', value: '100%', unit: 'ENGINEERED' }
            ].map((spec, index) => (
              <motion.div
                key={index}
                className="spec-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(204,0,0,0.1)',
                  transition: { duration: 0.3 }
                }}
              >
                <span className="spec-label">{spec.label}</span>
                <h3 className="spec-value">{spec.value}</h3>
                <span className="spec-unit">{spec.unit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="tour-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>EXPERIENCE AUTOMOTIVE PERFECTION</h3>
          <p>Schedule your service with precision and care</p>
          <motion.a
            href="#booking"
            className="cta-btn"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(204,0,0,0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK SERVICE NOW
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Car3DTour
