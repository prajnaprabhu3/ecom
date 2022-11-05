import Button from '../components/Button'
import { VscArrowRight } from 'react-icons/vsc';
import img from '../assets/ecommerce.png'
import {Link} from 'react-router-dom';
import '../styles/HeroSection.scss'

const HeroSection = () => {
  return (
   <div className='flex justify-between m-10 p-5  mb-10 items-center heroSection-wrapper'>

{/* left-section  */}
    <div className='flex  justify-between flex-col p-2 left-section'>
    <p className='text-lg font-bold'>Sell & Buy Anything</p>
    <div className='text-7xl font-semibold'>
        <p>All you need</p>
        <p>available at a single</p>
        <p>marketplace</p>
    </div>

    <Link to="shop" >
    <div className='flex items-center bg-white rounded-full px-7 py-2 cursor-pointer shopNow'>
        <p className='text-lg font-medium'>Shop Now</p>
        <VscArrowRight className='text-xl' />
    </div>
    </Link>

    </div>


    <div>
        <div className='slider rounded-2xl'>
            <img src={img} alt="" />
        </div>
    </div>

    
    

   </div>
  )
}

export default HeroSection