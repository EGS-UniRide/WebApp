import React from "react";
import ChatComponent from "../components/ChatComponent/ChatComponent.js";
import UserProfilePage from "./UserProfilePage.css";
import data from "../pages/data/drivers.json";
import { useParams } from "react-router-dom";

class OtherUsers extends React.Component {
	state = {
		classNames: "",
		name: "",
		email: "",
		phone: ""
	};

	componentDidMount() {
		/* const { match } = this.props;
		const driverId = match.params.id; */

		// Extract the driver's information based on the ID passed as a prop
		const driver = data.drivers.find((driver) => driver.id === 2);

		// Update the component state with the driver's information
		this.setState({
			name: driver.title,
			email: driver.email,
			phone: driver.phone,
			imageSrc: driver.imageSrc,
		});
	}

	render() {

		return (
			<>
				<div className="cards_profile">
					<div className="card_user">
						<div
							className={`flip-card-inner ${this.state.classNames}`}
							onAnimationEnd={this.onAnimationEnd}
							onAnimationStart={this.onAnimationStart}
						>
							<div className="flip-card-front">
								<img
									src={this.state.imageSrc}
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
											{this.state.name}
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
								</div>
							</div>
						</div>
					</div>

					<div className="card_chat">
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
export default OtherUsers;
