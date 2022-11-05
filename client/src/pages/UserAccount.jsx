import React from 'react'
import '../styles/UserAccount.scss'
import  { FaUser } from 'react-icons/fa'
import { GiShoppingBag} from 'react-icons/gi'
import { IoLogOut } from 'react-icons/io5'
import  { Link } from 'react-router-dom';
import Logo from '../components/Logo'
import { useAlert } from "react-alert";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";


const UserAccount = () => {
    const alert = useAlert();
    const dispatch = useDispatch();


const onLogout = event => {
        // 👇️ refers to the link element
       dispatch(logout());
       alert.success("Logout Successfully");
      };
  return (
<div>
{/* <header className='flex items-center justify-between p-6 px-10 max-full  bg-white drop-shadow-sm'> */}


{/* </header> */}
    <Link to="/">
    <div className='flex justify-center items-center mt-24'>
    <Logo/>
    </div>
    </Link>

  <div className='flex justify-evenly userAccount items-center mt-36'>

 
    
    {/* cards  */}
    <Link to="/profile" className='hover:text-violet-600'>
    <div className='flex flex-col justify-center items-center bg-white userOption-cards rounded-xl'>
        <FaUser className='text-5xl icon  ' />
        <p className='text-2xl font-semibold mt-4'>Profile Details</p>
    </div>
    </Link>

    {/* orders  */}
    <Link to="/orders" className='hover:text-violet-600'>
    <div className='flex flex-col justify-center items-center bg-white userOption-cards rounded-xl'>
        <GiShoppingBag className='text-6xl' />
        <p className='text-2xl font-semibold mt-4'>Orders</p>
    </div>
    </Link>

    {/* logout  */}
    <Link to="/" className='hover:text-violet-600' onClick={onLogout}>
    <div className='flex flex-col justify-center items-center bg-white userOption-cards rounded-xl'>
        <IoLogOut className='text-6xl' />
        <p className='text-2xl font-semibold mt-4'>Logout</p>
    </div>
    </Link>

  </div>
  </div>
  )
}

export default UserAccount