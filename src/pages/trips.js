/* import React from 'react';
import './Trip.css';
import "./data/history.json"


function TripBox({ driver, time, place }) {
  return (
    <div className="trip-box">
      <div className="driver">{driver}</div>
      <div className="time">{time}</div>
      <div className="place">{place}</div>
    </div>
  );
}

class trips extends React.Component {
  state = {
    classNames: "",
    driver: "",
    time: "",
    place: ""
  };

  render() {

      return (
        <>
          <div className="trips-page">
            <h1>Trip History</h1>
            <div className="trip-boxes">
              {data.history.map(trip => (
                <TripBox
                  driver={data.history.driver}
                  time={data.history.time}
                  place={data.history.place}
                />
              ))}
            </div>
          </div>
        </>
      );
  }
}
export default trips;

 */