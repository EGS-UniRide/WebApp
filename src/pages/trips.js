import React from "react";

const TripItem = ({ trip }) => {
  return (
    <div className="trip-item">
      <div className="trip-item-body">
        <p>Driver: {trip.driver}</p>
        <p>Passenger: {trip.passenger}</p>
        <h3>Date: {trip.date}</h3>
        <h4>Price: {trip.price}</h4>
      </div>
    </div>
  );
};

export default TripItem;
