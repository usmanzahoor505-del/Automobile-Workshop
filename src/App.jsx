import { useState, useEffect } from 'react'
// Testing simple 3D version
import Hero from './components/Hero3DSimple'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Car3DTour from './components/Car3DTour'
import About from './components/About'
import Testimonials from './components/Testimonials'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import './App.css'

function App() {
  const [loaderComplete, setLoaderComplete] = useState(false)
  // Set to false to disable loader completely
  const ENABLE_LOADER = false  // Temporarily disabled for debugging

  const handleLoaderComplete = () => {
    setLoaderComplete(true)
  }

  useEffect(() => {
    if (!ENABLE_LOADER) {
      setLoaderComplete(true)
    }
  }, [])

  return (
    <>
      {ENABLE_LOADER && !loaderComplete && <PageLoader onComplete={handleLoaderComplete} />}
      <div className="app" style={{ opacity: loaderComplete ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <Hero />
        <Car3DTour />
        <Services />
        <About />
        <Testimonials />
        <BookingForm />
        <Footer />
      </div>
    </>
  )
}

export default App
