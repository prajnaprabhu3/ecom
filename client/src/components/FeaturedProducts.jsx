import React, { useEffect } from "react";
import Product from './ProductCard.js'

//redux
import { clearErrors, getProduct } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

// import Loadning component 
import Loading from "../components/Loading";

//for error alert
import { useAlert} from 'react-alert';


const FeaturedProducts = () => {
// for error alert 
const alert=useAlert();

//added to getProduct
const dispatch = useDispatch();

// to display products fetched from backend
const { loading,error,products,productCount}=useSelector(state=>state.products);

useEffect(() => {
  if(error){
    return alert.error(error);
  }

  dispatch(getProduct());
}, [dispatch,error]);
//added end


  return (
    <div className="m-10 mt-20 p-5 ">
    {loading ? (
      <Loading />
    ) : (
      <div className="">
        <h2 className="text-4xl font-bold">Featured  Products</h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </div>
    )}
  </div>
  )
}

export default FeaturedProducts