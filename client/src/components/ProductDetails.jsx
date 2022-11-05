import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails} from "../actions/productActions";
import { useAlert } from "react-alert";
import Loading from '../components/Loading'
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import {addItemsToCart} from '../actions/cartActions'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import '../styles/ProductDetails.scss'
import Logo from "./Logo";



const ProductDetails = () => {
    const { id } = useParams();
  
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const {product,loading, error } = useSelector((state) => state.productDetails
    );
  
    
  
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getProductDetails(id));
    }, [dispatch,id,error,alert]);
  
    const options ={
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      size:window.innerWidth < 600 ? 20 :25,
      value: product.ratings,
      isHalf:true,
    };

    const [quantity, setQuantity] = useState(1);

    // to increase and decrease the no of products you want 
    const increaseQuantity = () => {
      if (product.Stock <= quantity) return;
  
      const qty = quantity + 1;
      setQuantity(qty);
    };
  
    const decreaseQuantity = () => {
      if (1 >= quantity) return;
  
      const qty = quantity - 1;
      setQuantity(qty);
    };

    const addToCartHandler = () => {
      dispatch(addItemsToCart(id, quantity));
      alert.success("Item Added To Cart");
    };
    
    return (
      <>
      {loading ? <Loading/>
      : <Fragment>

<header className='flex items-center justify-between p-6 px-10 max-full  bg-white drop-shadow-sm'>

<Logo/>

{/* Search bar here  */}

{/* account details */}
<div className="flex justify-between text-2xl">
  <Link to="/account" className="accountAndCart" ><BiUser className="mr-6" /></Link>
 <Link to="/cart" className="accountAndCart" > <AiOutlineShoppingCart  className="accountAndCar ml-4 mr-10"/> </Link>
</div>

</header>

      <div className="ProductDetails">
        <div className="carousel">
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
  
  
      <div className="productDetailsSection">
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product #{product._id}</p>
                </div>
  
                <div className="detailsBlock-2">
                  <ReactStars {...options}/>
                  <p>({product.numOfReviews} Reviews)</p>
                </div>
  
                <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="flex items-center  detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1 items-center flex mr-4">
                    <button onClick={decreaseQuantity} className="bg-violet-500 p-2 text-white rounded">-</button>
                    <input  type="number" value={quantity} className="quantityInput" />
                    <button onClick={increaseQuantity} className="bg-violet-500 p-2 text-white rounded">+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false} className="bg-violet-500 text-white font-semibold p-2 rounded ml-4"
                    onClick={addToCartHandler}
                    >
                    Add to Cart
                  </button>
                </div>
  
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                </div>
  
              <div className="detailsBlock-4">
               Description : <p>{product.description}</p> 
              </div>
  
              <button className="bg-violet-500 w-1/3 flex justify-center items-center rounded font-semibold text-medium text-white py-1.5 submitReview">Submit Review</button>
  
      </div>
        
      </div>
  
  
  {/* Reviews Area  */}
  <h3 className="reviewHeading">Reviews</h3>
  
  {product.reviews && product.reviews[0] ? (
    <div className="reviews">
      {product.reviews && 
        product.reviews.map((review)=> <ReviewCard review={review} />)}
    </div>
  ) : (
   <p className="noReviews">No Reviews Yet</p>
  )}
  
      
  </Fragment>
  // <div>"Hellp"</div> 
   } </>    
    );
  };
  
  export default ProductDetails