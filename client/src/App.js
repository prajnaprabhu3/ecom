import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Button from "./components/Button";
import ProductDetails from "./components/ProductDetails";
import { Footer } from "antd/lib/layout/layout";
import store from './store';
import  { useEffect} from 'react';
import { loadUser } from "./actions/userActions";
import {useSelector} from 'react-redux';
import UserAccount from "./pages/UserAccount";
import Profile from "./pages/Profile";
import Orders from './pages/Orders';
import ProtectedRoute from "./Routes/ProtectedRoute";
import UpdateDetails from "./pages/UpdateDetails";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import ConfettiComponent from "./pages/ConfettiComponent";


function App() {
const {isAuthenticated,user}=useSelector(state=>state.user);

  useEffect(() => {

    store.dispatch(loadUser());


  }, []);


  return (
    <BrowserRouter>
    <div className="App">
      {/* <Home/> */}

      {/* {isAuthenticated && <UserAccount  user={user}/>} */}
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/product/:id" element={ <ProductDetails/> } />
      <Route path="/shop" element={<Shop/>} />

      <Route path="/auth/" element={<SignUp/>} />
      <Route path="/login" element={<SignIn/>} />

      {/* account routes  */}
        {/* profile route protected  */}
      <Route exact path='/profile' element={<ProtectedRoute/>}>
      <Route exact path='/profile' element={<Profile/>}/>
    </Route>

    {/* orders  */}
    <Route exact path='/orders' element={<ProtectedRoute/>}>
      <Route exact path='/orders' element={<Orders/>}/>
    </Route>

    {/* logout  */}
    <Route exact path='/logout' element={<ProtectedRoute/>}>
      <Route exact path='/logout' element={<Home/>}/>
    </Route>

      {/* protected route implementation for /account route  */}
     <Route exact path='/account' element={<ProtectedRoute/>}>
      <Route exact path='/account' element={<UserAccount/>}/>
    </Route>

    {/* update user details again protected  */}
    <Route exact path='/profile/update' element={<ProtectedRoute/>}>
      <Route exact path='/profile/update' element={<UpdateDetails/>}/>
    </Route>

    {/* update password  */}
    <Route exact path='/password/update' element={<ProtectedRoute/>}>
      <Route exact path='/password/update' element={<UpdatePassword/>}/>
    </Route>

    {/* forgot password  - to send token to mail id*/}
    <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
  
    {/* reset password  */}
    <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>

    {/* carts route  */}
    <Route exact path='/cart' element={<Cart/>}/>
    

    {/* order done  */}
    <Route exact path='/confetti' element={<ProtectedRoute/>}>
      <Route exact path='/confetti' element={<ConfettiComponent/>}/>
    </Route>

      </Routes>
      
      {/* <Footer/> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
