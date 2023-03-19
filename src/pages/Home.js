import React, { Component } from "react";
import './home.css'
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ChangeView } from "./ChangeView";
import { Icon } from "leaflet";
import randomLocation from 'random-location'
import axios from 'axios';
import data from "./data/drivers.json"
import CarList from "../components/CarBoxes/CarList.js"

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			passenger: []
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

			data.drivers[i]["latitude"] =  driversPos[i].latitude
			data.drivers[i]["longitude"] =  driversPos[i].longitude
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

	render() {
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

		return (
			<div>
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
				<CarList cars={data.drivers} />
			</div>
		)
	}
}

export function AppWithRouter(props) {
	const navigate = useNavigate()
	return (<Home {...props} navigate={navigate}></Home>)
}

export default AppWithRouter;