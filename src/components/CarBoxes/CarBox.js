import React from 'react';
import './cars.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';

function CarBox({ imageSrc, title, description, description1, description2, description3, onChooseTrip, driverID }) {

	const button1 = {
		alignItems: 'center',
		display: "table",
		paddingVertical: 12,
		width: 200,
		paddingHorizontal: 14,
		borderRadius: 10,
		marginRight: 15,
		backgroundColor: 'black',
		float: 'left',
		border: 'none',
		marginRight: '0px'
	}

	const text = {
		fontSize: 16,
		lineHeight: 3,
		marginLeft: 45,
		textAlign: 'center',
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
	}

	return (
		<div className="car-box">
			<div className="car-image">
				<img id="profilePic" src={imageSrc} onClick={() => redirectProfile(driverID)} />
			</div>
			<div className="car-info">
				<h2>{title}</h2>
				<p>{description}</p>
				<p1>{description1}</p1>
			</div>
			<div className="car-local">
				<p> <strong className='bold'>Local de Partida:</strong> {description2}</p>
				{/* <p style={{ textAlign: "right" }}>
					<strong style={{ fontSize: "25px" }} className='bold'>4.5</strong>
					<img style={{ width: "35px" }} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png"} />
				</p> */}
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
					<Button style={button1}>Visitar Perfil</Button>
				</div>
			</div>
		</div>
	);
} export default CarBox;

function redirectProfile(id) {
	// console.log("redirect");
	// console.log(id)

	<Navigate to={'/othersProfile/' + id} />
}
