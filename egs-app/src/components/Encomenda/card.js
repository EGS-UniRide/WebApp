import React from "react";

const Cards = ({ item, handleClick }) => {
  const { title, price, img } = item;
  return (
    <div className="cards">
      <div className="image_box">
        <img src={img} alt="" height="100" width="100" />
      </div>
      <div className="details">
        <p>{title}</p>
        <p>{price}€</p>
        <button onClick={() => handleClick(item)}>+ Add to Cart</button>
      </div>
    </div>
  );
};

export default Cards;