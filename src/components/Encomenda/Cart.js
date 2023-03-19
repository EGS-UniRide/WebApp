import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import Modall from "../HeroSignUp/ModalCart.js";
import 'bootstrap/dist/css/bootstrap.min.css';


const button2 = {
  alignItems: 'center',
  display: "table",
  paddingVertical: 12,
  width: 150,
  height:28,
  display:"flex",
  marginTop:200,
  paddingHorizontal: 14,
  borderRadius: 10,
  marginRight: 15,
  backgroundColor: 'black',
  borderWidth: 1,
  borderColor:"black",
  float: 'left',
}
const text2 ={
  fontSize: 16,
  lineHeight: 3,
  marginLeft:45,
  textAlign: 'center',
  letterSpacing: 0.25,
  color: 'white',
}
const text ={
  fontSize: 16,
  lineHeight: 3,
  marginLeft:45,
  textAlign: 'center',
  letterSpacing: 0.25,
  color: 'black',
}


const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };


  useEffect(() => {
    handlePrice();
  });

 

  return (
    <section className="Cart">
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{item.amount}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span style={text}>Total</span>
        <span>{price}€</span>
      </div>
      <div>
        <Modall/>
      </div>
    </section>
  );
};

export default Cart;