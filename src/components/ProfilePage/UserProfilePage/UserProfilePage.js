import React from "react";
import "./User.css"
import TripHistoryBox from "../../../pages/TripHistory";
import PaymentHistoryBox from "../../../pages/payments/PaymentHistory";
import data from "../../../pages/data/history.json"
import dataForPayment from "../../../pages/data/payments.json"

class UserProfilePage extends React.Component {
  state = {
    classNames: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    fullName: "",
    animationFinished: false,
    showAnimationStartLabel: false
  };

  getCF() {
    return JSON.parse(localStorage.getItem("bd"));
  }

  onNameChange(value) {
    this.setState({
      name: value,
    });
  }

  onFullNameChange(value) {
    this.setState({
      fullName: value,
    });
  }

  onEmailChange(value) {
    this.setState({
      email: value,
    });
  }

  onPhoneChange(value) {
    this.setState({
      phone: value,
    });
  }

  onAddressChange(value) {
    this.setState({
      address: value,
    });
  }

  startStopAnimation = () => {
    const { classNames } = this.state;

    this.setState({ classNames: classNames ? "" : "animation" });
  };

  onAnimationStart = () => {
    this.setState({
      animationFinished: false,
      showAnimationStartLabel: true,
    });
  };

  onAnimationEnd = () => {
    this.setState({
      animationFinished: true,
      showAnimationStartLabel: false,
    });
  };

  componentDidMount() {

    // Extract information about the user who made the login
  
    /* // Extract the driver's information based on the ID passed as a prop
    const user = data.drivers.find((driver) => driver.id === 1);

    // Update the component state with the driver's information
    this.setState({
      name: driver.title,
      email: driver.email,
      phone: driver.phone,
      imageSrc: driver.imageSrc,
    }); */
  }

  render() {
    const arrayCF = this.getCF();
    if (arrayCF == null) {
      return (
        <>
          <div className="profile">
            <div className="card">
              <div
                className={`flip-card-inner ${this.state.classNames}`}
                onAnimationEnd={this.onAnimationEnd}
                onAnimationStart={this.onAnimationStart}
              >
                <div className="flip-card-front">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5231/5231020.png"
                    alt="Avatar"
                    id="avatarImage"
                  />
                  <div className="container">
                    <h4>
                      <b>{this.state.name}</b>
                    </h4>
                  </div>
                  <hr></hr>
                  <div className="informationContainer">
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Nome Completo:
                      <span style={{ float: "right" }}>
                        {this.state.fullName}
                      </span>
                    </p>
                    <hr></hr>
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Email:
                      <span style={{ float: "right" }}>{this.state.email}</span>
                    </p>
                    <hr></hr>
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Número telemóvel:
                      <span style={{ float: "right" }}>{this.state.phone}</span>
                    </p>
                    <hr></hr>
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Morada:
                      <span style={{ float: "right" }}>
                        {this.state.address}
                      </span>
                    </p>
                    <hr></hr>

                    <button
                      onClick={this.startStopAnimation}
                      className="buttonStyle"
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <div className="flip-card-back">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5231/5231020.png"
                    alt="Avatar"
                    id="avatarImage"
                  />
                  <div className="container">
                    <h4>
                      <input
                        type="text"
                        defaultValue={this.state.name}
                        onChange={(e) => this.onNameChange(e.target.value)}
                      ></input>
                    </h4>
                  </div>
                  <hr></hr>
                  <div className="informationContainer">
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Nome Completo:
                      <input
                        style={{ float: "right" }}
                        type="text"
                        defaultValue={this.state.fullName}
                        onChange={(e) => this.onFullNameChange(e.target.value)}
                      ></input>
                    </p>
                    <hr></hr>
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Email:
                      <input
                        style={{ float: "right" }}
                        type="text"
                        defaultValue={this.state.email}
                        onChange={(e) => this.onEmailChange(e.target.value)}
                      ></input>
                    </p>
                    <hr></hr>
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Número telemóvel:
                      <input
                        style={{ float: "right" }}
                        type="text"
                        defaultValue={this.state.phone}
                        onChange={(e) => this.onPhoneChange(e.target.value)}
                      ></input>
                    </p>
                    <hr></hr>
                    <p style={{ textAlign: "left", padding: "10px" }}>
                      Morada:
                      <input
                        style={{ float: "right" }}
                        type="text"
                        defaultValue={this.state.address}
                        onChange={(e) => this.onAddressChange(e.target.value)}
                      ></input>
                    </p>
                    <hr></hr>

                    <button
                      onClick={this.startStopAnimation}
                      className="buttonStyle2"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cardOtherSide" >
               <div className="historyTrips">
                  <TripHistoryBox trips={data.history} />
              </div>
              <div className="historyPayments">
                  <PaymentHistoryBox pays={dataForPayment.payments} />
              </div> 
            </div>
           
          </div>
        </>
      );
    }
  }
}
export default UserProfilePage;
