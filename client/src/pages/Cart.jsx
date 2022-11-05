import React, { Fragment } from "react";
import CartCard from "../components/CartCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartActions";
import { Link, useNavigate } from "react-router-dom";

import '../styles/Cart.scss'

const Cart = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  // original to be 
  // const checkoutHandler = () => {
  //   navigate("/login?redirect=shipping");
  // };

  // temp sol 
  const checkoutHandler = () => {
    navigate("/confetti");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart flex justify-center items-center mt-40 pt-20">

        <p className="text-2xl font-semibold mb-4">No Products in your cart</p>
         <p className="continueShoping text-white rounded-lg text-lg font-semibold py-1.5 px-2 hover:bg-violet-500"> <Link to="/shop" className=" hover:text-white">Continue Shoping</Link></p>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button className="bg-violet-500 p-2 text-white rounded"
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                        
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button className="bg-violet-500 p-2 text-white rounded"
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Cart Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;