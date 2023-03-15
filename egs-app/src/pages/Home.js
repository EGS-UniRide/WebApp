import React from "react";
import NavBar from "../components/NavBar.js"
import HerosectionAfter from "../components/Hero/HerosectionAfter.js"
import CarList from "../components/CarBoxes/CarList.js"
//import '../components/CarBoxes/cars.js'
import AddTripButton from '../components/tripButton/AddTripButton.js';
import { useState } from 'react';
import HeroLogin from "../components/HeroLogSign/HeroLogin.js";
import './home.css'


const cars = [
  {
    id: 1,
    title: "João da Silva",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/5231/5231020.png",
    matrícula: "40-RF-61",
    carModel: "Fiat Pulse",
    localRecolha: "Departamento de Informática UA",
    localDestino: "Departamento de Eng.Civil UA",
  },
  {
    id: 2,
    title: "Ines Moreira",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/5231/5231019.png",
    matrícula: "50-AA-78",
    carModel: "Fiat 500",
    localRecolha: "Departamento de Eng.Civil UA",
    localDestino: "Departamento de Informática UA",
  },
];

const Home = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

    return (
      <div>
      <NavBar />
      <HerosectionAfter />
      <button className="botton" onClick={togglePopup}>
        {isPopupOpen ? 'Fechar' : 'Adicionar Viagem'}
      </button>
      {isPopupOpen && (
        <HeroLogin
          trigger={isPopupOpen}
          setTrigger={setIsPopupOpen}
          onClose={togglePopup}
        />
      )}
      <CarList cars={cars} />
      </div>
    )
  }
  
  export default Home;