import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import './PageLoader.css'

const PageLoader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Super fast loading time - 500ms
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    // Also hide on any user interaction (click/scroll)
    const handleInteraction = () => {
      setLoading(false)
      clearTimeout(timer)
    }

    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('scroll', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true })

    // Cleanup
    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
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

            <motion.div
              className="loader-bar-container"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              <motion.div
                className="loader-bar"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
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
