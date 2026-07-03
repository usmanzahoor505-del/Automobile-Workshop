import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import './Testimonials.css'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      image: '👩‍💼',
      rating: 5,
      text: 'Elite Auto Workshop saved the day! My car broke down on a road trip, and they got me back on the road within hours. Professional, fast, and reasonably priced.'
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: '👨‍💻',
      rating: 5,
      text: 'I\'ve been bringing my cars here for 5 years. The team is honest, transparent, and never tries to upsell unnecessary services. Highly recommend!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Teacher',
      image: '👩‍🏫',
      rating: 5,
      text: 'As someone who knows nothing about cars, I really appreciate how they explain everything in simple terms. Fair pricing and excellent customer service.'
    },
    {
      name: 'David Thompson',
      role: 'Entrepreneur',
      image: '👨‍💼',
      rating: 5,
      text: 'The 3D diagnostic reports are amazing! I can see exactly what needs fixing. This level of transparency sets them apart from other workshops.'
    },
    {
      name: 'Lisa Anderson',
      role: 'Nurse',
      image: '👩‍⚕️',
      rating: 5,
      text: 'Quick turnaround, friendly staff, and my car runs better than ever. They even offered me a loaner car while mine was being serviced. Top-notch!'
    },
    {
      name: 'James Wilson',
      role: 'Retired Veteran',
      image: '👨‍✈️',
      rating: 5,
      text: 'Been to many mechanics in my life, but Elite Auto is simply the best. They treat my classic car with the respect it deserves. True professionals.'
    }
  ]

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied customers who trust us with their vehicles</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Quote className="quote-icon" size={40} />

              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.image}</div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Ready to experience elite service?</h3>
          <a href="#booking" className="btn btn-primary">
            Book Your Appointment
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
