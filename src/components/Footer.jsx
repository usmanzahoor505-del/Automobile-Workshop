import { motion } from 'framer-motion'
import { Wrench, MapPin, Phone, Mail, Share2 } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-logo">
              <Wrench size={32} />
              <span>Elite Auto Workshop</span>
            </div>
            <p className="footer-description">
              Your trusted partner for premium automotive care since 2010.
              Excellence in every service, every time.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon">
                <Share2 size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <Share2 size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <Share2 size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon">
                <Share2 size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#car-tour">3D Tour</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#booking">Book Now</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="#services">General Maintenance</a></li>
              <li><a href="#services">Engine Diagnostics</a></li>
              <li><a href="#services">Brake Services</a></li>
              <li><a href="#services">AC & Heating</a></li>
              <li><a href="#services">Tire Services</a></li>
              <li><a href="#services">Body Work</a></li>
            </ul>
          </motion.div>

          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Contact Info</h3>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} />
                <span>123 Auto Street<br />Motor City, MC 12345</span>
              </li>
              <li>
                <Phone size={18} />
                <span>(555) 123-4567</span>
              </li>
              <li>
                <Mail size={18} />
                <span>info@eliteauto.com</span>
              </li>
            </ul>
            <div className="footer-hours">
              <h4>Business Hours</h4>
              <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
              <p>Sat: 9:00 AM - 4:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Elite Auto Workshop. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
            <span>|</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
