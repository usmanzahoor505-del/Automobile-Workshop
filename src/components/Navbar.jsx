import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  // Car position: rides on the leading edge of the progress bar
  // Moves with the filled portion, not independently
  const carLeft = useTransform(
    scrollYProgress,
    (value) => `calc(${value * 100}% - ${value * 30}px)`
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'GALLERY', href: '#services' },
    { name: 'CAR TOUR', href: '#car-tour' },
    { name: 'ABOUT', href: '#about' },
    { name: 'OWNERSHIP', href: '#booking' }
  ]

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.a
          href="#home"
          className="navbar-logo"
          whileHover={{ scale: 1.02 }}
        >
          ELITE AUTO LAB
        </motion.a>

        <ul className="navbar-links desktop">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={link.href}>{link.name}</a>
            </motion.li>
          ))}
        </ul>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Progress Bar - embedded at bottom of navbar */}
      <div className="navbar-progress-container">
        {/* Red progress fill */}
        <motion.div
          className="navbar-progress-fill"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: 'left'
          }}
        />

        {/* Car marker on leading edge */}
        <motion.div
          className="navbar-car-marker"
          style={{
            left: carLeft,
            transform: 'translateX(0)'
          }}
        >
          <svg className="navbar-car-icon" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </div>

      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ul className="navbar-links mobile">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
