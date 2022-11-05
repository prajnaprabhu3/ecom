import React from 'react'
import Logo from './Logo'
import '../styles/Footer.scss'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white'>

     <div className='flex justify-between py-14 px-24  text-md font-bold'>

     <div className='flex flex-col justify-between items-start'>
      <Logo customClass="footerLogo" />
      <p className='font-light text-sm mt-3'>Thoughtful business for people's growth</p>
      </div>


      <div>
        <p>Follow us</p>
      </div>

      <div>Contact Us</div>

     </div>

     <div className='flex flex-col items-center py-3'>
      <p>&#169;copyright 2022 - Terms and conditions</p>
     </div>


    </div>
  )
}

export default Footer