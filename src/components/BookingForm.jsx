import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Car, User, Mail, Phone, MessageSquare } from 'lucide-react'
import './BookingForm.css'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceTypes = [
    'General Maintenance',
    'Brake Services',
    'Engine Diagnostics',
    'Battery & Electrical',
    'AC & Heating',
    'Tire Services',
    'Fluid Services',
    'Safety Inspection',
    'Check Engine Light',
    'Body Work',
    'Other'
  ]

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        carMake: '',
        carModel: '',
        carYear: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <section className="booking" id="booking">
      <div className="booking-container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Book Your Service</h2>
          <p>Schedule your appointment in just a few clicks</p>
        </motion.div>

        <div className="booking-content">
          <motion.div
            className="booking-form-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Booking Confirmed!</h3>
                <p>Thank you! We'll contact you shortly to confirm your appointment.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3><User size={20} /> Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3><Car size={20} /> Vehicle Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="carMake">Make *</label>
                      <input
                        type="text"
                        id="carMake"
                        name="carMake"
                        value={formData.carMake}
                        onChange={handleChange}
                        required
                        placeholder="Toyota"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="carModel">Model *</label>
                      <input
                        type="text"
                        id="carModel"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        required
                        placeholder="Camry"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="carYear">Year *</label>
                      <input
                        type="number"
                        id="carYear"
                        name="carYear"
                        value={formData.carYear}
                        onChange={handleChange}
                        required
                        placeholder="2020"
                        min="1900"
                        max="2026"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3><Calendar size={20} /> Service Details</h3>
                  <div className="form-group">
                    <label htmlFor="serviceType">Service Type *</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">Preferred Date *</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="preferredTime">Preferred Time *</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3><MessageSquare size={20} /> Additional Information</h3>
                  <div className="form-group">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about any specific issues or concerns..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  Book Appointment
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            className="booking-info"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="info-card">
              <Clock size={40} />
              <h3>Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="info-card">
              <Phone size={40} />
              <h3>Contact Us</h3>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@eliteauto.com</p>
              <p>Emergency: (555) 999-8888</p>
            </div>

            <div className="info-card">
              <Mail size={40} />
              <h3>Location</h3>
              <p>123 Auto Street</p>
              <p>Motor City, MC 12345</p>
              <p>United States</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm
