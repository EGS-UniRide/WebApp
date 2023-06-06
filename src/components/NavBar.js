import React from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Button from "./Button";

export default function NavBar({ setShow, size }) {
  const location = useLocation();
  const isNavBarPage = location.pathname === "/home"; // Replace with the actual route of the NavBar page

  const handleClick = () => {
    // Handle click event
  };

  const handleLogin = () => {
    // Handle click event
  };

  return (
    <nav className="nav"  >
      <div className="icon">
        <Link className="logoflex-row" to={"/home"}>
          <Logo icon="icon-park-solid" color="black" width="20" height="20" />
        </Link>
      </div>

      <div className="nav__menu">
        {isNavBarPage && location.pathname !== "/" && (
        <li className="nav_item2">
          <a href="/userProfile" className="nav__link1">
            A minha conta
          </a>
        </li> 
        )}

		{/* <Button Text="Entrar" onClick={handleLogin} /> */}
        {isNavBarPage && location.pathname !== "/notifications" && (
          <li className="notifications">
            <a href="/notifications" className="notes" onClick={handleClick}>
              <FontAwesomeIcon
                icon={faBell}
                size="lg"
                color="red"
                className="notification-icon"
              />
            </a>
          </li>
        )}
      </div>
    </nav>
  );
}
