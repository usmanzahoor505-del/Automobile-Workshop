import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import './PageLoader.css'

const PageLoader = () => {
  const [loading, setLoading] = useState(true)
  const progress = useMotionValue(0)
  const carLeft = useTransform(progress, [0, 100], ['0%', 'calc(100% - 30px)'])

  useEffect(() => {
    // Progress animation - 3.5 seconds
    const duration = 3500
    const startTime = Date.now()
    let animationFrame

    const animateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      progress.set(newProgress)

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animateProgress)
      } else {
        // Complete - hide loader
        setTimeout(() => {
          setLoading(false)
        }, 300)
      }
    }

    animationFrame = requestAnimationFrame(animateProgress)

    // Backup timer - ensure it always closes
    const backupTimer = setTimeout(() => {
      setLoading(false)
    }, duration + 500)

    // Also hide on any user interaction (click/scroll/touch)
    const handleInteraction = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      clearTimeout(backupTimer)
      setLoading(false)
    }

    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('scroll', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      clearTimeout(backupTimer)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [progress])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div className="loader-content">
            <motion.div
              className="loader-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                ELITE AUTO LAB
              </motion.h1>
            </motion.div>

            {/* Progress Bar with Car - Like Navbar */}
            <motion.div
              className="loader-progress-container"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {/* Red progress fill */}
              <motion.div
                className="loader-progress-fill"
                style={{
                  width: useTransform(progress, (v) => `${v}%`)
                }}
              />

              {/* Car marker on leading edge */}
              <motion.div
                className="loader-car-marker"
                style={{ left: carLeft }}
              >
                <svg className="loader-car-icon" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Car body */}
                  <path d="M 8 17 L 14 12 L 26 12 L 32 17 L 32 21 L 8 21 Z" fill="#ff0000" stroke="#ffffff" strokeWidth="1"/>
                  {/* Windshield */}
                  <path d="M 16 12 L 20 9 L 26 9 L 28 12 Z" fill="rgba(255,255,255,0.3)" stroke="#ffffff" strokeWidth="0.5"/>
                  {/* Front wheel */}
                  <circle cx="14" cy="23" r="2.5" fill="#1a1a1a" stroke="#666" strokeWidth="0.5"/>
                  <circle cx="14" cy="23" r="1.5" fill="#ff3333"/>
                  {/* Rear wheel */}
                  <circle cx="26" cy="23" r="2.5" fill="#1a1a1a" stroke="#666" strokeWidth="0.5"/>
                  <circle cx="26" cy="23" r="1.5" fill="#ff3333"/>
                  {/* Headlight */}
                  <circle cx="10" cy="16" r="1.2" fill="#ffff00" opacity="0.9"/>
                </svg>
              </motion.div>
            </motion.div>

            <motion.p
              className="loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              ENGINEERING EXCELLENCE
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
