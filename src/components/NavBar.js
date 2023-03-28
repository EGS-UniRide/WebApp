import React, { useState } from "react"
import Logo from "./Logo"
import { Link } from 'react-router-dom';
import "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function NavBar({ setShow, size }) {
	return (
		<nav className="nav">
			<div className="icon">
				<Link className="logoflex-row" to={"/home"}>
					<Logo icon="icon-park-solid" color="black" width="20" height="20" />
				</Link>
			</div>

			<div className="nav__menu">
				<li className="nav__item">
					<a href="/history" className="nav__link">
						Histórico de viagens
					</a>
				</li>
				<li className="nav_item2">
					<a href="/userProfile" className="nav__link1">
						A minha conta
					</a>
				</li>
				<li className="notifications">
					<a href="/notifications" className="notes">
						<FontAwesomeIcon icon={faBell} size="lg" color="red" className="notification-icon" />
					</a>
				</li>
			</div>

		</nav>
	);
}