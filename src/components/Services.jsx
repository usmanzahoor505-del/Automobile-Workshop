import { motion } from 'framer-motion'
import {
  Wrench,
  Droplet,
  Zap,
  Shield,
  Gauge,
  Wind,
  Battery,
  Disc,
  AlertCircle,
  Car
} from 'lucide-react'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <Wrench size={40} />,
      title: 'General Maintenance',
      description: 'Oil changes, filter replacements, and routine checkups to keep your car running smoothly.',
      price: 'From $79'
    },
    {
      icon: <Disc size={40} />,
      title: 'Brake Services',
      description: 'Complete brake inspection, pad replacement, and rotor resurfacing for optimal safety.',
      price: 'From $149'
    },
    {
      icon: <Zap size={40} />,
      title: 'Engine Diagnostics',
      description: 'Advanced computer diagnostics to identify and resolve engine issues quickly.',
      price: 'From $99'
    },
    {
      icon: <Battery size={40} />,
      title: 'Battery & Electrical',
      description: 'Battery testing, replacement, and electrical system repairs.',
      price: 'From $89'
    },
    {
      icon: <Wind size={40} />,
      title: 'AC & Heating',
      description: 'Climate control system inspection, recharge, and repair services.',
      price: 'From $129'
    },
    {
      icon: <Gauge size={40} />,
      title: 'Tire Services',
      description: 'Rotation, balancing, alignment, and new tire installation.',
      price: 'From $59'
    },
    {
      icon: <Droplet size={40} />,
      title: 'Fluid Services',
      description: 'Transmission, coolant, and power steering fluid checks and exchanges.',
      price: 'From $69'
    },
    {
      icon: <Shield size={40} />,
      title: 'Safety Inspection',
      description: 'Comprehensive vehicle safety inspection for peace of mind.',
      price: 'From $49'
    },
    {
      icon: <AlertCircle size={40} />,
      title: 'Check Engine Light',
      description: 'Diagnostic scan and repair for check engine light issues.',
      price: 'From $89'
    },
    {
      icon: <Car size={40} />,
      title: 'Body Work',
      description: 'Dent removal, paint touch-ups, and collision repair services.',
      price: 'From $199'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="services" id="services">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>ASYLUM</h2>
          <p>
            WHERE MACHINES ARE REBORN. PRECISION ENGINEERING MEETS OBSESSIVE CRAFTSMANSHIP.
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">{service.price}</div>
              <button className="service-btn">Learn More</button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>COMMISSION YOUR BUILD</h3>
          <p>WHERE YOUR VISION BECOMES MECHANICAL REALITY</p>
          <a href="#booking" className="btn btn-primary">
            BEGIN CONSULTATION
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
