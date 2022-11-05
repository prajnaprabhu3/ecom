import {useEffect} from 'react'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading'
import { useSelector } from "react-redux";
import Button from '../components/Button'
import { GiShoppingBag} from 'react-icons/gi'

import "../styles/Profile.scss"

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className='flex justify-center items-center m-20'> {loading ? ( <Loading/> ) :(
    <div className='flex flex-col  profileWrapper rounded-lg p-6 items-center'> 
       
       <h1 className='text-3xl mb-10 font-semibold'>Account Details</h1>

      <div className='flex flex-col justify-evenly h-full requiredArea'>
      <div className=''>
        <p className='text-2xl font-bold text-violet-500 profileVariables'>Name</p> 
        <p className='text-lg text-gray-400 mx-4 my-2'>{user.name}</p>
       </div>

       <div>
        <p className='text-2xl font-bold text-violet-500 profileVariables'>Email</p> 
        <p className='text-lg text-gray-400 mx-4 my-2'>{user.email}</p>
       </div>

       <div>
        <p className="text-2xl font-bold text-violet-500 profileVariables">Joined shopHere</p> 
        <p className='text-lg text-gray-400 mx-4 my-2'>{String(user.createdAt).substr(0, 10)}</p>
       </div>

      </div>

      <Link to="/orders">
      <div className='flex items-center justify-evenly text-lg rounded px-3 py-2 myOrders'>
        <GiShoppingBag className='text-2xl'/> 
        <p className='font-semibold ml-3'>My Orders</p>
      </div>
      </Link>

      <div className='flex justify-between mt-4 py-2 text-lg font-medium  editProfileChangePassword'>
        <Link to="/profile/update" > <p className='editProfile text-white py-1 px-6 rounded'>Edit Profile</p> </Link>
        <Link to="/password/update"> <p className='editProfile text-white py-1 px-2 rounded'>Change Password</p>  </Link>
      </div>

    </div>
      )}</div>
  )
}

export default Profile


      