import React from 'react';
import CarBox from './CarBox.js';
import './cars.css';
import './cars.js';

function CarList({ cars }) {
    return (
      <div className="car-list">
        {cars.map((car) => (
          <CarBox
            key={cars.id}
            title={car.title}
            imageSrc={car.imageSrc}
            description={car.matrícula}
            description1={car.carModel}
            description2={car.localAtual}
            onChooseTrip={() => console.log('Escolher Viagem')}
          />
        ))}
      </div>
    );
  } export default CarList;
  