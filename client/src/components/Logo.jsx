import { HiShoppingBag } from 'react-icons/hi'
import '../styles/Logo.scss';

const Logo = ({customClass}) => {
  return (
   <div className={`flex items-center logo`}>

    <HiShoppingBag className='text-3xl' />

    <p className={`text-2xl font-bold shop-logo ${customClass}`}>shop<span className='here-logo'>Here</span> </p>
    
   </div>
  )
}

export default Logo