import React from 'react';
import './Cart.css'
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItemsLength = useSelector((state) => {
    // console.log(state);
    return state.Cart?.length
  })
  const cartUnitPrice = useSelector((state) => {
    return state?.Cart[0]?.unit_price
  })
  const totalPrice = useSelector((state) => {
    return state.Cart?.length * state?.Cart[0]?.unit_price
  })
  return (
    <div className='cart'>
      <div><span>productItems: {cartItemsLength}</span></div>
      <div><span>productPrice: {cartUnitPrice?cartUnitPrice:cartItemsLength}</span></div>
      <div><span>totalPrice: {totalPrice?totalPrice:cartItemsLength}</span></div>
    </div>
  );
};

export default Cart;