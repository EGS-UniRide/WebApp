import React from "react";
import TripItem from "./trips";
import "../components/ProfilePage/UserProfilePage/User.css";

const TripHistoryBox = ({ trips }) => {
  const sortedTrips = trips.slice().reverse();
  return (
    <div className="historyCard">
      <h3>Trips History</h3>
      <div className="trip-history-container">
        {sortedTrips.map((trip) => (
          <div key={trip.id}>
            <p>Driver: {trip.driver}</p>
            <p>Passenger: {trip.passenger}</p>
            <p>Date: {trip.date}</p>
            <p>Price: {trip.price}</p>
            <div className="space" style={{ height: "10px", borderTop: "1px solid black" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistoryBox;
