import { motion } from 'framer-motion'
import { Award, Users, Clock, ThumbsUp } from 'lucide-react'
import './About.css'

const About = () => {
  const features = [
    {
      icon: <Award size={40} />,
      title: 'Certified Experts',
      description: 'ASE-certified technicians with years of experience'
    },
    {
      icon: <Clock size={40} />,
      title: 'Fast Turnaround',
      description: 'Most services completed same-day or while you wait'
    },
    {
      icon: <ThumbsUp size={40} />,
      title: 'Quality Guarantee',
      description: '12-month/12,000-mile warranty on all repairs'
    },
    {
      icon: <Users size={40} />,
      title: 'Customer First',
      description: 'Transparent pricing and honest recommendations'
    }
  ]

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Why Choose Elite Auto Workshop?</h2>
            <p className="about-intro">
              For over a decade, we've been the trusted choice for car owners who demand
              excellence. Our state-of-the-art facility combines cutting-edge diagnostic
              equipment with old-school craftsmanship.
            </p>
            <p>
              We believe in transparency, quality, and treating every vehicle as if it
              were our own. From routine oil changes to complex engine repairs, our team
              delivers results that exceed expectations.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3>15K+</h3>
                <p>Cars Serviced</p>
              </div>
              <div className="stat-item">
                <h3>13+</h3>
                <p>Years in Business</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Expert Team</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-features"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
