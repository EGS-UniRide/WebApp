import React from "react";
import PaymentHistory from "./pays";
import "../../components/ProfilePage/UserProfilePage/User.css";

const PaymentHistoryBox = ({ pays }) => {
  const sortedPayments = pays.slice().reverse();
  return (
    <div className="historyPayment">
      <h3>Payments History</h3>
      <div className="payment-history-container">
        {sortedPayments.map((pay) => (
          <div key={pay.id}>
            <p>Driver: {pay.driver}</p>
            <p>Date: {pay.date}</p>
            <p>Price: {pay.price}</p>
            <div className="space" style={{ height: "10px", borderTop: "1px solid black" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistoryBox;
