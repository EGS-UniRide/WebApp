import React from 'react';
import './herosection.css';
import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import locationData from "./data/locations.json";
import { useState } from "react";

export default function HerosectionAfter() {

	// const green = new Icon({
	// 	iconUrl: "/active.svg",
	// 	iconSize: [25, 25]
	// })

	// const red = new Icon({
	// 	iconUrl: "/error.svg",
	// 	iconSize: [25, 25]
	// })

	// const [showOnlyActive, setShowOnlyActive] = useState(false);
	return (

		<div>
			{/* <div className="filter-options">
				<label>
					<input
						type="checkbox"
						checked={showOnlyActive}
						onChange={(event) => setShowOnlyActive(event.target.checked)}
					/>
					Do Not Display Data
				</label>
			</div> */}
			{/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 40px 0px 0px' }}>
				<MapContainer center={[40.633024, -8.657777]} zoom={14} >
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{locationData.features.map((local) =>
						showOnlyActive ? null : (
							<Marker
								key={local.properties.PLACE_ID}
								position={[
									local.geometry.coordinates[0],
									local.geometry.coordinates[1],
								]}
								icon={local.properties.PERSON === "Driver"
									? red :
									green}
							>
								<Popup>
									<div>
										<center>
											<p><b>Localização:</b> {local.properties.LOCAL}</p>
											<p><b>Endereço:</b> {local.properties.LOCAL_FR}</p>
											<p><b>Código Postal:</b> {local.properties.ADDRESS}</p>
										</center>
									</div>
								</Popup>

							</Marker>
						)
					)}

				</MapContainer>
			</div> */}

			<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}