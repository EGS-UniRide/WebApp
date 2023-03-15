import React from "react";
import EncomendaAction from "../components/Encomenda/EncomendaAction.js";
import NavBar from "../components/NavBar.js"
import Cart from "../components/Encomenda/Cart.js";

import { useState } from "react";

const Encomenda= () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };


    return (
      <React.Fragment>
        <NavBar setShow={setShow} size={cart.length}/>
        {show ? (
        <EncomendaAction handleClick={handleClick} />
      ) : (
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
      )}
      </React.Fragment>
    )
  }
  
  export default Encomenda