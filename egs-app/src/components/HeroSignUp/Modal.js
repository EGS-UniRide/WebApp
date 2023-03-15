import React, { useState } from "react";
import "./Modal.css";
import "../Pay.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import Card from "../Encomenda/card.js";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();


  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const validate = () => {
      alert("Compra efetuada COM sucesso");
      navigate("/LogSign");
  };

  return (
    <>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"></link>
      <button onClick={toggleModal} className="button-18">
        Comprar
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Pagamento</h2>
            <div class="form">
    
      <label class="label">Titular do Cartão:</label>
      <input type="text" class="input" placeholder="Nome do titular" maxlength="30"></input>
      <i class="fas fa-user"></i>
    
    
      <label class="label">Número do Cartão:</label>
      <input type="text" class="input" data-mask="0000 0000 0000 0000" placeholder="xxxx xxxx xxxx xxxx" maxlength="12"></input>
      <i class="far fa-credit-card"></i>
    <div class="card-grp space">
      <div class="card-item icon-relative">
        <label class="label">Data de validade:</label>
        <input type="text" name="expiry-data" class="input" data-mask = "00/00"  placeholder="00 / 00" ></input>
        <i class="far fa-calendar-alt"></i>
      </div>
      <div class="card-item icon-relative">
        <label class="label">CVC:</label>
        <input type="text" class="input" data-mask="000" placeholder="000" maxlength="3"></input>
        <i class="fas fa-lock"></i>
      </div>
    </div>
      
    <button className="button-18" onClick={validate}>
        Pagar
    </button>
    
  </div>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    
    </>
  );
}