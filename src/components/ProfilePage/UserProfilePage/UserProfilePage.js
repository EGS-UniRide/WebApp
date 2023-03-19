import React from "react";
import { Link } from "react-router-dom";
import ChatComponent from "../../ChatComponent/ChatComponent";
import "./UserProfilePage.css";

class UserProfilePage extends React.Component {
  state = {
    classNames: "",
    animationFinished: false,
    showAnimationStartLabel: false,
    name: "João da Silva",
    fullName: "Some Some",
    email: "teste@gmai.com",
    phone: "937123123",
    address: "Avenida Duque, Aveiro, 193",
  };

  getCF() {
    return JSON.parse(localStorage.getItem("cf_bd"));
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

  render() {
    const arrayCF = this.getCF();
    if (arrayCF == null) {
      return (
        <>
          <div className="cards_profile">
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

            <div className="card">
              <div className="informationContainer">
                <div className="container">
                  <ChatComponent></ChatComponent>
                </div>
              </div>
            </div>

           {/*  <div className="card">
              <div className="informationContainer">
                <div className="container">
                  <h4>
                    <b>Definições de conta</b>
                  </h4>
                </div>
                <hr></hr>
                <div>
                  <h3>Notificações </h3>
                  <h5> Aceder às opções de notificações</h5>
                </div>
                <div></div>
                <hr></hr>
                <div>
                  <h3>Privacidade </h3>
                  <h5> Aceder às opções de privacidade</h5>
                </div>
                <div></div>
                <hr></hr>
                <div>
                  <h3>Segurança </h3>
                  <h5> Aceder às opções de segurança</h5>
                </div>
                <hr></hr>
                <div>
                  <h3>Ajuda </h3>
                  <h5> Se precisar de ajudar selecione esta opção</h5>
                </div>
                <div></div>
                <hr></hr>
              </div>
            </div> */}
          </div>
        </>
      );
    }

    if (arrayCF.length == 1) {
      return (
        <>
          <div className="cards_profile">
            <div className="card">
              <div
                className={`flip-card-inner ${this.state.classNames}`}
                onAnimationEnd={this.onAnimationEnd}
                onAnimationStart={this.onAnimationStart}
              >
                <div className="flip-card-front">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
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


            <div className="card">
              <div className="informationContainer">
                <div className="container">
                  <ChatComponent></ChatComponent>
                </div>
              </div>
            </div>

            {/* <div className="card">
              <div className="informationContainer">
                <div className="container">
                  <h4>
                    <b>Definições de conta</b>
                  </h4>
                </div>
                <hr></hr>
                <div>
                  <h3>Notificações </h3>
                  <h5> Aceder às opções de notificações</h5>
                </div>
                <div></div>
                <hr></hr>
                <div>
                  <h3>Privacidade </h3>
                  <h5> Aceder às opções de privacidade</h5>
                </div>
                <div></div>
                <hr></hr>
                <div>
                  <h3>Segurança </h3>
                  <h5> Aceder às opções de segurança</h5>
                </div>
                <hr></hr>
                <div>
                  <h3>Ajuda </h3>
                  <h5> Se precisar de ajudar selecione esta opção</h5>
                </div>
                <div></div>
                <hr></hr>
              </div>
            </div>*/}
          </div> 
        </>
      );
    }
    if (arrayCF.length == 2) {
      return (
        <>
          <div className="cards_profile">
            <div className="card">
              <div
                className={`flip-card-inner ${this.state.classNames}`}
                onAnimationEnd={this.onAnimationEnd}
                onAnimationStart={this.onAnimationStart}
              >
                <div className="flip-card-front">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
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

            <div className="card">
              <div className="informationContainer">
                <div className="container">
                <ChatComponent></ChatComponent>
              </div>
            </div>
          </div>
          </div>
        </>
      );
    }
  }
}
export default UserProfilePage;
