import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import './ScrollProgress.css'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  // Car position: 0 to calc(100% - 40px) to account for car width
  const carLeft = useTransform(scrollYProgress, [0, 1], ['0%', 'calc(100% - 40px)'])

  return (
    <>
      {/* Progress Bar Container */}
      <motion.div className="scroll-progress-bar-fixed">
        {/* Filled portion */}
        <motion.div
          className="scroll-progress-fill"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: 'left'
          }}
        />

        {/* Car Marker - exactly at fill position */}
        <motion.div
          className="car-progress-marker"
          style={{
            left: carLeft,
            transform: 'translateX(0)'
          }}
        >
          <svg className="car-marker-icon" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Car body */}
            <path d="M 15 28 L 25 20 L 55 20 L 65 28 L 65 33 L 15 33 Z" fill="#cc0000" stroke="#ff0000" strokeWidth="1.5"/>

            {/* Windshield */}
            <path d="M 28 20 L 35 15 L 45 15 L 52 20 Z" fill="rgba(255,255,255,0.2)" stroke="#ff6666" strokeWidth="0.5"/>

            {/* Front wheel */}
            <circle cx="25" cy="35" r="4" fill="#222"/>
            <circle cx="25" cy="35" r="2" fill="#ff6666"/>

            {/* Rear wheel */}
            <circle cx="55" cy="35" r="4" fill="#222"/>
            <circle cx="55" cy="35" r="2" fill="#ff6666"/>

            {/* Headlight glow */}
            <circle cx="18" cy="26" r="2" fill="#ffff00" filter="url(#glow)"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Progress Percentage Display */}
      <motion.div
        className="progress-text-display"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
        }}
      >
        {useTransform(scrollYProgress, [0, 1], [0, 100]).get().toFixed(0)}%
      </motion.div>
    </>
  )
}

export default ScrollProgress
