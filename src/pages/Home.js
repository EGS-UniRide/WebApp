import React, { Component } from "react";
import './home.css'
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ChangeView } from "./ChangeView";
import { Icon } from "leaflet";
import randomLocation from 'random-location'
import axios from 'axios';
import data from "./data/drivers.json"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Row } from "reactstrap";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/CarBoxes/cars.css';
import '../components/CarBoxes/cars.js';

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			passenger: [],
			show: false,
		}
	}

	// Chargers information updated every second (1000ms)
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(this.getPosition)

		// Generate drivers coordinates
		const center = {
			latitude: 40.637295,
			longitude: -8.648662
		}
		const range = 1000 // meters

		var driversPos = []
		for (let i = 0; i < 10; i++) {
			driversPos[i] = randomLocation.randomCirclePoint(center, range)

			// Reverse geocoding on the drivers location
			var url_driver = "https://api.maptiler.com/geocoding/" + driversPos[i].longitude + "," + driversPos[i].latitude +
				".json?key=6yDldySYut6Xgsl7SNwD&limit=1"

			axios.get(url_driver)
				.then(response => {
					data.drivers[i]["localAtual"] = response.data.features[0]["place_name"]
				})

			data.drivers[i]["latitude"] = driversPos[i].latitude
			data.drivers[i]["longitude"] = driversPos[i].longitude
		}
	}

	// To get the passenger position
	getPosition = (position) => {
		this.setState({
			passenger: [position.coords.latitude, position.coords.longitude]
		})
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	// To close the edit model modal
	handleClose = () => {
		this.setState({
			show: false,
		})
	}

	// To open the edit model modal
	handleShow = () => {
		this.setState({
			show: true
		})
	}

	// To debug the animal checkbox question (yes)
	changeSimAnimal = (event) => {
		if (event.target.checked === true && document.getElementById("nao-animal").checked === true) {
			swal("Operação não permitida!", "Apenas é possível selecionar uma resposta!", "error");
			event.target.checked = false;
		}
	}

	// To debug the animal checkbox question (no)
	changeNaoAnimal = (event) => {
		if (event.target.checked === true && document.getElementById("sim-animal").checked === true) {
			swal("Operação não permitida!", "Apenas é possível selecionar uma resposta!", "error");
			event.target.checked = false;
		}
	}

	// To debug the child checkbox question (yes)
	changeSimCrianca = (event) => {
		if (event.target.checked === true && document.getElementById("nao-crianca").checked === true) {
			swal("Operação não permitida!", "Apenas é possível selecionar uma resposta!", "error");
			event.target.checked = false;
		}
	}

	// To debug the child checkbox question (no)
	changeNaoCrianca = (event) => {
		if (event.target.checked === true && document.getElementById("sim-crianca").checked === true) {
			swal("Operação não permitida!", "Apenas é possível selecionar uma resposta!", "error");
			event.target.checked = false;
		}
	}

	// To debug the lugage checkbox question (yes)
	changeSimBagagem = (event) => {
		if (event.target.checked === true && document.getElementById("nao-bagagem").checked === true) {
			swal("Operação não permitida!", "Apenas é possível selecionar uma resposta!", "error");
			event.target.checked = false;
		}
	}

	// To debug the lugage checkbox question (no)
	changeNaoBagagem = (event) => {
		if (event.target.checked === true && document.getElementById("sim-bagagem").checked === true) {
			swal("Operação não permitida!", "Apenas é possível selecionar uma resposta!", "error");
			event.target.checked = false;
		}
	}

	// TODO
	startTravel = () => {
		var payload = { "points": [] }

		// Create the paylod to the API call
		data.drivers.forEach((driver, index) => {
			var dict = {}
			dict["latitude"] = driver.latitude
			dict["longitude"] = driver.longitude

			payload["points"].push(dict)
		})

		axios.post("http://localhost:8040/points/v1/inside-points?latitude=" + this.state.passenger[0] + "&longitude="
			+ this.state.passenger[1] + "&range=1", payload
		)
			.then((response) => {
				console.log(response.data)
			})


		// Call the MatchingAPI (Need to add the driver's questions answers to the drivers.json file)
		// Get the return value/(s)
		// If the result is not unique, select one randomly
		// ...
	}

	// To redirect to the driver profile
	redirectDriverProfile = (id) => {
		this.props.navigate({
			pathname: "/othersProfile",
			search: createSearchParams({
				id: id
			}).toString()
		})
	}

	render() {
		var show = this.state.show
		var passenger = this.state.passenger
		var center = [40.633024, -8.657777]

		var carIcon = new Icon({
			iconUrl: 'https://cdn.pixabay.com/photo/2022/06/06/14/39/marker-7246182_960_720.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [28, 38],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		var redIcon = new Icon({
			iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		if (passenger[0] !== undefined) {
			center = passenger
		}

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

		return (
			<div style={{ backgroundColor: "#addbd0", paddingRight: '0px' }}>
				<Modal show={show} onHide={this.handleClose} dialogClassName="custom-dialog" id="iniciar-viagem">
					<Modal.Header closeButton style={{
						paddingTop: '1%', paddingBottom: '1%', textAlign: 'center', border: 'none',
						borderBottom: '1px solid black'
					}}>
						<Modal.Title style={{ paddingLeft: '28%', fontSize: '30px' }}>
							Iniciar viagem
						</Modal.Title>
					</Modal.Header>

					<Modal.Body style={{ overflow: 'hidden' }}>
						<Container fluid>
							<Row style={{ marginLeft: '4%' }}>
								<p style={{ marginLeft: '3.4%', marginBottom: '0rem', marginTop: '1%', fontSize: '18px' }}>
									<b>P1:</b> Transporta animais consigo?
								</p>
								<div style={{ marginLeft: '3.4%', marginBottom: '5%' }}>
									<input type="checkbox" value="Sim" id="sim-animal" onChange={this.changeSimAnimal} /> Sim
									<input type="checkbox" value="Não" id="nao-animal" onChange={this.changeNaoAnimal}
										style={{ marginLeft: '5%' }} /> Não
								</div>
							</Row>

							<Row style={{ marginLeft: '4%' }}>
								<p style={{ marginLeft: '3.4%', marginBottom: '0rem', fontSize: '18px' }}>
									<b>P2:</b> Está acompanhado de uma criança?
								</p>
								<div style={{ marginLeft: '3.4%', marginBottom: '5%' }}>
									<input type="checkbox" value="Sim" id="sim-crianca" onChange={this.changeSimCrianca} /> Sim
									<input type="checkbox" value="Não" id="nao-crianca" onChange={this.changeNaoCrianca}
										style={{ marginLeft: '5%' }} /> Não
								</div>
							</Row>

							<Row style={{ marginLeft: '4%' }}>
								<p style={{ marginLeft: '3.4%', marginBottom: '0rem', fontSize: '18px' }}>
									<b>P3:</b> Leva alguma bagagem de mão?
								</p>
								<div style={{ marginLeft: '3.4%' }}>
									<input type="checkbox" value="Sim" id="sim-bagagem" onChange={this.changeSimBagagem} /> Sim
									<input type="checkbox" value="Não" id="nao-bagagem" onChange={this.changeNaoBagagem}
										style={{ marginLeft: '5%' }} /> Não
								</div>
							</Row>
						</Container>
					</Modal.Body>

					<Modal.Footer>
						<div style={{ display: 'flex', justifyContent: 'right' }}>
							<Button variant="primary" onClick={this.startTravel}
								style={{ backgroundColor: '#fcc186', border: 'none', width: '130px', color: 'black' }}>
								Iniciar viagem
							</Button>
						</div>
					</Modal.Footer>
				</Modal>

				<Container fluid style={{ paddingLeft: '0px', paddingRight: '0px' }}>
					<MapContainer center={center} zoom={16} scrollWheelZoom={true}>
						<ChangeView center={center} zoom={16} />
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={passenger[0] == undefined ? [0, 0] : passenger} icon={redIcon}></Marker>
						{
							data.drivers[0]["latitude"] !== undefined ?
								(
									data.drivers.map(driver => (
										<Marker key={driver.id} position={[driver.latitude, driver.longitude]} icon={carIcon}>
											<Popup>
												<b>Nome: </b>{driver.title}
												<br />
												<b>Carro: </b>{driver.carModel}
												<br />
												<b>Matrícula: </b>{driver.matrícula}
											</Popup>
										</Marker>
									))
								)
								:
								(
									<Marker position={[0, 0]}></Marker>
								)
						}
					</MapContainer>

					<div style={{ textAlign: "center" }}>
						<Button onClick={this.handleShow} style={{
							marginTop: '1%', fontSize: '20px', borderRadius: "10px", border: 'none', color: 'black',
							boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fcc186', width: '10%', height: '50px'
						}}>
							Iniciar viagem
						</Button>
					</div>

					<div className="car-list">
						{data.drivers.map((car) => (
							<div className="car-box">
								<div className="car-image">
									<img id="profilePic" src={car.imageSrc} onClick={() => this.redirectDriverProfile(car.id)} />
								</div>
								<div className="car-info">
									<h2>{car.title}</h2>
									<p>{car.matrícula}</p>
									<p1>{car.carModel}</p1>
								</div>
								<div className="car-local">
									<p> <strong className='bold'>Local de Partida:</strong> {car.localAtual}</p>
									<div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
										<Button style={button1} onClick={() => this.redirectDriverProfile(car.id)}>
											Visitar Perfil
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</Container>
			</div>
		)
	}
}

export function AppWithRouter(props) {
	const navigate = useNavigate()
	return (<Home {...props} navigate={navigate}></Home>)
}

export default AppWithRouter;