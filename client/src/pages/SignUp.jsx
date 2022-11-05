import '../styles/SignUp.scss'
import ecommerce from '../assets/ecommerce.png'
import Button from '../components/Button'
import { FcGoogle } from 'react-icons/fc'
import { Link } from "react-router-dom";


import {register } from '../actions/userActions';
import { useState, useEffect ,useRef} from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors,login } from '../actions/userActions';
import { useAlert } from "react-alert";
import Loading from '../components/Loading';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const alert = useAlert();
    const registerTab= useRef(null);

    const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        // myForm.set("avatar", avatar);
        console.log("Signup successfully");
        dispatch(register(myForm));
      };
    
    

const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

const {name,email,password}=user;

const {error, loading, isAuthenticated}=useSelector((state)=>state.user);

const [avatar,setAvatar]=useState("/Profile.png");
const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };



useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }


    if (isAuthenticated) {
        navigate("/account");
      }
},[dispatch, error, alert,isAuthenticated, ]);


  return (
<div className='flex m-auto mt-10 bg-white rounded-xl SignUp-wrapper'>

<div className='purple-section m-4 rounded-xl'>
<img src={ecommerce} alt=""  className='mt-40 m-auto'/>
</div>


<div className='flex flex-col justify-between align-middle mt-28 mx-auto  signUP-section'>
    
    {/* first-section  */}
    <div className='pb-10'>
        <p className='text-2xl font-semibold'>Create your account</p>
        <p className='text-sm text-gray-500 font-semibold'>lease enter your details below to get started</p>
    </div>
    {/* first-section ends  */}

    <form action="" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
    <div className='mb-3 text-sm'>
   Name <br/>
   <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    className='outline-none border border-gray-300 px-4 py-2 rounded-md text-gray-500 inputTag'
                  />
   </div>

    
   

    {/* second-section  */}
    <div className='flex flex-col justify-between'>
   <div className='mb-3 text-sm'>
   Email <br/>
    <input type="text" placeholder='Enter your email' className='outline-none border border-gray-300 px-4 py-2 rounded-md text-gray-500 inputTag' required name="email" value={email} onChange={registerDataChange}/>
   </div>

   <div className='text-sm' >
   Password <br/>
    <input type="text" placeholder='Enter your password' className='outline-none border border-gray-300 px-4 py-2 rounded-md text-gray-500 inputTag' required name="password" value={password} onChange={registerDataChange}/>
   </div>
    
    </div>
    {/* second-section ends  */}

    {/* third-section */}
    <div className='flex flex-col justify-between  third-section input-emailPassword'>
        
        <div className='flex rounded-md px-4 mt-6 py-2 text-white font-bold items-center justify-center signUp-signUP-button'>
           <input type="submit" value="Sign Up" />
            {/* <p>Sign Up</p> */}
        </div>

        <div className='flex justify-center rounded-md mt-4 px-4 py-2 text-black border border-gray-300  font-semibold text-sm items-center signUp-signUPGoogle-button'>
           < FcGoogle className='text-xl mr-4'/>
            <p>Sign Up with Google</p>
        </div>

    </div>
    {/* third-section ends  */}
    </form>

    {/* fourth-section  */}
    <div>
        <p className='flex justify-center text-xs font-regular mt-10'>Already have an account? 
        <Link to="/login">  <span className='purple ml-1 font-bold'>Sign in</span>   </Link>
      
        </p>
    </div>
    {/* fourth-section ends  */}


</div>


</div>
  )
}

export default SignUp