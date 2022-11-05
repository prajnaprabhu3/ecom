import React , {useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti';
import {BsCheckCircleFill} from 'react-icons/bs'

import '../styles/Cart.scss'

const Confetti = () => {
  return (
    <div>
        <ReactConfetti
        // width={100}
        // height={100}
        />

        <div className='flex flex-col justify-center items-center mt-60 text-5xl'>
            <BsCheckCircleFill className='text-green-500 text-8xl' />
            <p className='mt-6 font-semibold purple'>Thank you for purchasing with us</p>
        </div>
        
    </div>
  )
}

export default Confetti