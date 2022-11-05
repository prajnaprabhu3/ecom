import { navLinks } from './navLinks'
import Logo from './Logo';
import Button from './Button';
import { Routes, Route, Link } from 'react-router-dom'
import {useSelector} from 'react-redux';
import { BiUser } from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'


const Navbar = () => {
  const {isAuthenticated,user}=useSelector(state=>state.user);
  return (
    <header className='flex items-center justify-between p-6 px-10 max-full  bg-white drop-shadow-sm'>

      <Logo/>

      <div className='hidden md:inline-flex text-lg font-medium cursor-pointer space-x-24'>
      {/* {navLinks.map((link, index) => {
        return ( 
          <div id={index}  className={`hover:text-violet-500  `}>
                   <p className="flex space-x-4 ">{link.title}</p>
          </div>
        );
      })} */}
       <a href="#about">About</a>
        <Link to="/shop">Shop</Link>
        <a href="#faq">FAQ</a>
      </div>

    
      {/* <div className='flex'>
      <Link to="/login" >   <Button buttonText="Login" customClass="login"/> </Link>
       <Link to="/auth"> <Button buttonText="Sign up" customClass="sign-in"/>  </Link>
       </div>  */}

<div className='flex'>
       {!isAuthenticated ? (
        <div className='flex'>
           <Link to="/login" >   <Button buttonText="Login" customClass="login"/> </Link>
       <Link to="/auth"> <Button buttonText="Sign up" customClass="sign-in"/>  </Link>
        </div>
       ): (
        <div>
         
        {/* account details */}
      <div className="flex justify-between text-2xl">
  <Link to="/account" className="accountAndCart" ><BiUser className="mr-6" /></Link>
  <Link to="/cart" className="accountAndCart" > <AiOutlineShoppingCart  className="accountAndCar ml-4 mr-10"/> </Link>
      </div> 
         </div>
       )}
    </div>
    </header>
  )
}

export default Navbar