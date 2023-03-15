import React, {useState} from "react"
import Logo from "../../components/Logo"
import { Link } from 'react-router-dom';
import "./styles.css"



export default function NavBar() {
  
   
    return (
      <nav className="nav">
        <Link className="logo flex-row" to={"/"}>
            <Logo icon="icon-park-solid:love-and-help" color="blue" width="24" height="24" />
        </Link>
        <ul className="nav__menu">
          <li className="nav__item">
            <a href="#" className="nav__link">
              About us
            </a>
          </li>
          
        </ul>
  
      </nav>
    );
  }