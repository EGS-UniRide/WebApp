import React from "react";

const PaymentHistory = ({ paid }) => {
  return (
    <div className="payment-item">
      <div className="payment-item-body">
        <p>Driver: {paid.driver}</p>
        <h3>Date: {paid.date}</h3>
        <h4>Price: {paid.price}</h4>
      </div>
    </div>
  );
};

export default PaymentHistory;