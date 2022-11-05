import About from '../components/About'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'

import '../styles/Home.scss'
import FeaturedProducts from '../components/FeaturedProducts'


const Home = () => {
  return (
    <div>
        <Navbar />
        
        <div className='home-contents py-8'>
        <HeroSection/>
        <FeaturedProducts/>
       
        <About/>
       <FAQ/>
       
        </div>
        <Footer/>

    </div>
  )
}

export default Home