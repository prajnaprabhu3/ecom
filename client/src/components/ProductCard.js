import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

import '../styles/Home.scss';


const ProductCard = ({product}) => {
  const options={
    edit:false,
    color:"rgb(20,20,20,0.1)",
    activeColor:"rgb(125, 104, 255)",
    size: window.innerWidth <600 ? 10 : 15,
    value:product.ratings,
    isHalf:true
}

  return (
   <Link className='productCard flex flex-col justify-center items-center m-4 '  to={`/product/${product._id}`}>
    <div className='bg-white productCardDiv flex flex-col justify-center items-center p-4 rounded-xl hover:drop-shadow-lg'>
    <img src={product.images[0].url} alt={product.name} className="" />
    <p className='text-xl py-2 font-semibold'>{product.name}</p>
    <div className='flex mt-1'>
        <ReactStars {...options} /> <span className='ml-4 review'>({product.numOfReviews} reviews)</span>
    </div>
    <span className='text-lg font-bold mt-2 purple'>
       {` ₹ ${product.price}`}
    </span>

    </div>
   </Link>
  )
}

export default ProductCard