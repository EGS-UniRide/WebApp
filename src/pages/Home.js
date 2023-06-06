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
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/CarBoxes/cars.css';
import '../components/CarBoxes/cars.js';

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			passenger: [],
			show: false,
			showSuccess: false,
			showFailed: false
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
		// Debug all the checkboxes
		var checksNums = 0
		var a1, a2, a3;

		if (document.getElementById("sim-animal").checked == true) {
			a1 = "sim"
			checksNums++;
		}
		if (document.getElementById("nao-animal").checked == true) {
			a1 = "não"
			checksNums++;
		}
		if (document.getElementById("sim-crianca").checked == true) {
			a2 = "sim"
			checksNums++;
		}
		if (document.getElementById("nao-crianca").checked == true) {
			a2 = "não"
			checksNums++;
		}
		if (document.getElementById("sim-bagagem").checked == true) {
			a3 = "sim"
			checksNums++;
		}
		if (document.getElementById("nao-bagagem").checked == true) {
			a3 = "não"
			checksNums++;
		}

		// Check if all the required checkboxes are checked
		if (checksNums !== 3) {
			swal("Respostas Inválidas!", "É necessário responder a todas as questões colocadas!", "error");
		} else {
			// Prepare the payload for the MatchingAPI
			var matchPayload = {
				"objects": {
					"a1": a1,
					"a2": a2,
					"a3": a3
				},
				"list": []
			}

			data.drivers.forEach((driver, index) => {
				var dict = {}
				dict["a1"] = driver.questions[0]["a1"]
				dict["a2"] = driver.questions[0]["a2"]
				dict["a3"] = driver.questions[0]["a3"]

				matchPayload["list"].push(dict)
			})

			// console.log(JSON.stringify(matchPayload))
			// console.log(matchPayload)

			// Call the MatchingAPI
			axios.post("http://matching-api:8030/objects/v1/match", matchPayload)
				.then((response) => {
					// The var that will store the result of the Matching API call
					var matchedDriversID = []
					response.data.forEach((result, index) => {
						data.drivers.forEach((driver, index) => {
							if (result["a1"] == driver.questions[0]["a1"] && result["a2"] == driver.questions[0]["a2"] &&
								result["a3"] == driver.questions[0]["a3"]) {

								// console.log(driver.id)
								// console.log(matchedDriversID.includes(driver.id))

								if (!matchedDriversID.includes(driver.id)) {
									matchedDriversID.push(driver.id)
								}
							}
						})
					})

					// console.log(matchedDriversID)
					// console.log(data)

					// Prepare the payload for the Closer Geographically points API
					var pointsPayload = { "points": [] }

					matchedDriversID.forEach((driverMatch, index) => {
						data.drivers.forEach((driver, index) => {
							if (driver.id === driverMatch) {
								var dict = {}
								dict["latitude"] = driver.latitude
								dict["longitude"] = driver.longitude
								pointsPayload["points"].push(dict)
							}
						})
					})

					// Make the request for the Closer Geographically Points API
					// console.log(pointsPayload)
					axios.post("http://closer-geo-point-api:8040/points/v1/inside-points?latitude=" + this.state.passenger[0] +
						"&longitude=" + this.state.passenger[1] + "&range=1", pointsPayload
					)
						.then((response) => {
							// console.log(response.data)

							// console.log(response.data.length)
							if (response.data.length === 0) {
								axios.post("http://closer-geo-point-api:8040/points/v1/inside-points?latitude=" + this.state.passenger[0] +
									"&longitude=" + this.state.passenger[1] + "&range=5", pointsPayload
								)
									.then((response) => {
										var randomIndex = Math.floor(Math.random() * response.data.length)
										// console.log(response.data[randomIndex])

										data.drivers.forEach((driver, index) => {
											if (response.data[randomIndex]["latitude"] === driver.latitude &&
												response.data[randomIndex]["longitude"] === driver.longitude) {
												// console.log(driver.id)

												var payerid = Math.floor((Math.random() * 1000) + 1);

												axios.post("http://127.0.0.1:8000/v2/payments/bill", {
													"payerid": payerid,
													"receiverid": driver.id,
													"paydate": new Date(Date.now())
												}).then((response) => {
													if (response["status"] === 200) {

														// TODO -> change data from body request
														axios.post("http://notificationsapi-svc:8010/v2/email", {
															"address": "tahd99@gmail.com",
															"subject": "UniRide Payments",
															"description": "You owe 3.20eur for your last ride"
														})

														this.setState({
															show: false,
															showSuccess: true
														})

														setTimeout(() => {
															this.setState({
																showSuccess: false
															})
														}, 3000)
													}
													else {
														this.setState({
															show: false,
															showFailed: true
														})

														setTimeout(() => {
															this.setState({
																showFailed: false
															})
														}, 3000)
													}
												})
											}
										})
									})
							}
							else if (response.data.length > 1) {
								var randomIndex = Math.floor(Math.random() * response.data.length)
								// console.log(response.data[randomIndex])

								data.drivers.forEach((driver, index) => {
									if (response.data[randomIndex]["latitude"] === driver.latitude &&
										response.data[randomIndex]["longitude"] === driver.longitude) {
										// console.log(driver.id)

										var payerid = Math.floor((Math.random() * 1000) + 1);

										axios.post("http://127.0.0.1:8000/v2/payments/bill", {
											"payerid": payerid,
											"receiverid": driver.id,
											"paydate": new Date(Date.now())
										}).then((response) => {
											if (response["status"] === 200) {

												// TODO -> change data from body request
												axios.post("http://notificationsapi-svc:8010/v2/email", {
													"address": "tahd99@gmail.com",
													"subject": "UniRide Payments",
													"description": "You owe 3.20eur for your last ride"
												})

												this.setState({
													show: false,
													showSuccess: true
												})

												setTimeout(() => {
													this.setState({
														showSuccess: false
													})
												}, 3000)
											}
											else {
												this.setState({
													show: false,
													showFailed: true
												})

												setTimeout(() => {
													this.setState({
														showFailed: false
													})
												}, 3000)
											}
										})
									}
								})

							}
							else {
								var randomIndex = Math.floor(Math.random() * response.data.length)
								// console.log(response.data[randomIndex])

								data.drivers.forEach((driver, index) => {
									if (response.data[randomIndex]["latitude"] === driver.latitude &&
										response.data[randomIndex]["longitude"] === driver.longitude) {
										// console.log(driver.id)

										var payerid = Math.floor((Math.random() * 1000) + 1);

										axios.post("http://127.0.0.1:8000/v2/payments/bill", {
											"payerid": payerid,
											"receiverid": driver.id,
											"paydate": new Date(Date.now())
										}).then((response) => {
											if (response["status"] === 200) {

												// TODO -> change data from body request
												axios.post("http://notificationsapi-svc:8010/v2/email", {
													"address": "tahd99@gmail.com",
													"subject": "UniRide Payments",
													"description": "You owe 3.20eur for your last ride"
												})

												this.setState({
													show: false,
													showSuccess: true
												})

												setTimeout(() => {
													this.setState({
														showSuccess: false
													})
												}, 3000)
											}
											else {
												this.setState({
													show: false,
													showFailed: true
												})

												setTimeout(() => {
													this.setState({
														showFailed: false
													})
												}, 3000)
											}
										})
									}
								})
							}
						})
				})
		}
	}


	test = () => {
		
			// Call the MatchingAPI
			axios.get("http://paymentsapi-svc:8000/v2/payments/bills")
			.then(response => {
				console.log(response.data)
			})
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
		var showSuccess = this.state.showSuccess
		var showFailed = this.state.showFailed

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
				<div style={{ position: "absolute" }}>
					<Alert show={showSuccess} key="success" variant="success"
						style={{
							position: "relative", top: "20px", width: "335px", left: "402%", zIndex: "2",
							fontSize: "18px", fontWeight: "bold"
						}}>
						Payment was successfully realized!
					</Alert>
				</div>

				<div style={{ position: "absolute" }}>
					<Alert show={showFailed} key="danger" variant="danger"
						style={{
							position: "relative", top: "20px", width: "335px", left: "402%", zIndex: "2",
							fontSize: "18px", fontWeight: "bold"
						}}>
						Payment failed!
					</Alert>
				</div>

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
							<Button variant="primary" onClick={this.test}
								style={{ backgroundColor: '#fcc186', border: 'none', width: '130px', color: 'black' }}>
								Qualquer coisa
							</Button>
						</div>
					</Modal.Footer>
				</Modal>

				<Container fluid style={{ paddingLeft: '0px', paddingRight: '0px' }}>
					<MapContainer center={center} zoom={16} scrollWheelZoom={true} style={{ zIndex: "1" }}>
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