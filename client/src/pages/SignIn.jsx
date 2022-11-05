import '../styles/SignUp.scss'
import ecommerce from '../assets/ecommerce.png'
import Button from '../components/Button'
import { FcGoogle } from 'react-icons/fc'
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux';
import {clearErrors,login } from '../actions/userActions';
import { useAlert } from "react-alert";
import Loading from '../components/Loading';




const SignIn = ({ history, location }) => {
const navigate = useNavigate();
const dispatch=useDispatch();
const alert = useAlert();


const {error, loading, isAuthenticated}=useSelector((state)=>state.user);

const loginTab= useRef(null);

const [loginEmail,setLoginEmail]=useState(null);
const [loginPassword,setLoginPassword]=useState(null);

const loginSubmit =(e)=>{
    e.preventDefault();
    console.log("Loign Form Submitted");
    dispatch(login(loginEmail,loginPassword));
}



useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }


    if (isAuthenticated) {
        navigate("/");
      }
},[dispatch, error, alert, history, isAuthenticated, ]);

  return (
    <>
    {loading ? ( <Loading/>) :
    (
        <div className='flex m-auto mt-10 bg-white rounded-xl SignUp-wrapper'>

<div className='purple-section m-4 rounded-xl'>
<img src={ecommerce} alt=""  className='mt-40 m-auto'/>
</div>


<div className='flex flex-col justify-between align-middle mt-28 mx-auto  signUP-section'>
    
    {/* first-section  */}
    <div>
        <p className='text-2xl font-semibold'>Welcome back</p>
        <p className='text-sm text-gray-500 font-semibold'>Please enter your details below to login</p>
    </div>
    {/* first-section ends  */}

    <form action="" className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
    {/* second-section  */}
    <div className='flex flex-col justify-between'>
   <div className='mb-3 text-sm'>
   Email <br/>
    <input type="text" placeholder='Enter your email' className='outline-none border border-gray-300 px-4 py-2 rounded-md text-gray-500 inputTag' required name="email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
   </div>

   <div className='text-sm' >
   Password <br/>
    <input type="text" placeholder='Enter your password' className='outline-none border border-gray-300 px-4 py-2 rounded-md text-gray-500 inputTag' required value={loginPassword}  onChange={(e)=>setLoginPassword(e.target.value)} />
   </div>
    
    </div>
    {/* second-section ends  */}

    {/* third-section */}
    <div className='flex flex-col justify-between  third-section input-emailPassword'>
        
        {/* forget password  */}
        <Link className='my-2' to="/password/forgot"> Forgot Password ? </Link>

        <div className='flex mb-3 rounded-md px-4 py-2 text-white font-bold items-center justify-center signUp-signUP-button'>
        <input type="submit" value="Login"  /> 
        {/* <p>Sign In</p> */}
        </div>

        <div className='flex justify-center rounded-md px-4 py-2 text-black border border-gray-300  font-semibold text-sm items-center signUp-signUPGoogle-button'>
           < FcGoogle className='text-xl mr-2'/>
            <p>Sign In with Google</p>
        </div>

    </div>
    {/* third-section ends  */}
    </form>


    {/* fourth-section  */}
    <div>
        <p className='flex justify-center text-xs font-regular'>Don't have an account? 
        <Link to="/auth">   <span className='purple ml-1 font-bold'>Sign up</span> </Link>
       </p>
    </div>
    {/* fourth-section ends  */}


</div>


</div>
    )}
    
    
    
    </>
  )
}

export default SignIn