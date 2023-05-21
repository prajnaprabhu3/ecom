import React, { Fragment, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "react-js-pagination";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

import { clearErrors, getProduct } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

// fitler components from material ui

// import Loadning component
import Loading from "../components/Loading";

//for error alert
import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";

import { useState } from "react";

import "../styles/Shop.scss";
import Logo from "../components/Logo";
import Button from "../components/Button";

const Shop = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  // filters
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // const keyword = match.params.keyword;
  const keyword = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <header className="flex items-center justify-between p-6 px-10 max-full  bg-white drop-shadow-sm">
            <Logo />

            {/* Search bar here  */}

            {/* account details */}
            <div className="flex justify-between text-2xl">
              <Link to="/account" className="accountAndCart">
                <BiUser className="mr-6" />
              </Link>
              <Link to="/cart" className="accountAndCart">
                {" "}
                <AiOutlineShoppingCart className="accountAndCar ml-4 mr-10" />{" "}
              </Link>
            </div>
          </header>

          <h2 className="productsHeading">Products</h2>

          {/* products get  */}
          <div className="flex justify-center items-center">
            <div className="container grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 justify-center items-center ">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>

          {/* filters  */}
          {/* <div className="filterBox">
        <Typography>Price</Typography>
        <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={25000}/>
        
       

       </div> */}

          {/* Pagination  */}

          {/* {resultPerPage < count && ( */}
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          {/* )}  */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shop;
