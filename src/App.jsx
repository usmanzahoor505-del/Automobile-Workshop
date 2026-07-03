import Hero from './components/Hero'
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
  // Set to false to disable loader completely
  const ENABLE_LOADER = true

  return (
    <>
      {ENABLE_LOADER && <PageLoader />}
      <div className="app">
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
