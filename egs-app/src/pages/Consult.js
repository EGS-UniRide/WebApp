import React from 'react'
import NavBar from "../components/NavBar.js"
import { useState } from 'react';
import Calendar from 'react-calendar';
import '../App.css';
import 'react-calendar/dist/Calendar.css';
import '../components/Calendar.css';
import Cao from '../assests/dog_cat.png';
import Popup from 'reactjs-popup';
import SuccessTxt from '../components/SuccessTxt/SuccessTxt.js';
import { TextInput } from 'react-native-web';

export default function Consult() {
  const [date, setDate] = useState(new Date());

  const [formValue, setformValue] = React.useState({
    username: '',
    password: ''
  });

  // reset input values
  const handleClick = () => {

    const addMessage = (body) => {
      let sender = "app";
      let dateTime = Date();
      let id = Math.random() * 100;
      const messageStorage = JSON.parse(localStorage.getItem("message_db"));
      let newMessage;

      if (messageStorage) {
        newMessage = [...messageStorage, { body, sender, dateTime, id }];
      } else {
        newMessage = [{ body, sender, dateTime, id }];
      }

      localStorage.setItem("message_db", JSON.stringify(newMessage));

      return;
    };
    
    addMessage("Foi marcada uma consulta na data: "+ date.toLocaleDateString('en-GB')+".");

    setformValue({
      text1: '',
      text2: '',
      text3: ''
    });
  };


  const pos_border = {
    boxSizing: "border-box",
    position: "absolute",
    width: "450px",
    height: "618px",
    left: "214px",
    top: "150px",
    background: "#ADDBD0",
    border: "3px solid #FFFFFF",
    boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px"
  }

  const pos_calendar = {
    boxSizing: "border-box",
    position: "absolute",
    left: "900px",
    top: "230px"
  }

  
  const textB = {
    position: "absolute",
    width: "200px",
    height: "16px",
    left: "100px",
    top: "20px",
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "15px"
  }


  const text = {
    position: "absolute",
    width: "200px",
    height: "16px",
    left: "30px",
    top: "40px",
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "15px"
  }

  const text2 = {
    position: "absolute",
    width: "200px",
    height: "16px",
    left: "30px",
    top: "150px",
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "15px"
  }

  const text3 = {
    position: "absolute",
    width: "200px",
    height: "16px",
    left: "30px",
    top: "250px",
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "15px"
  }

  const textbox = {
    boxSizing: "border-box",
    position: "absolute",
    width: "400px",
    height: "46px",
    left: "20px",
    top: "60px",
    background: "#ADDBD0",
    border: "2px solid #E3E3E3",
    borderRadius: "3px",
    fontSize: "20px"
  }

  const textbox2 = {
    boxSizing: "border-box",
    position: "absolute",
    width: "400px",
    height: "46px",
    left: "20px",
    top: "170px",
    background: "#ADDBD0",
    border: "2px solid #E3E3E3",
    borderRadius: "3px",
    fontSize: "20px"
  }

  const textbox3 = {
    boxSizing: "border-box",
    position: "absolute",
    width: "400px",
    height: "200px",
    left: "20px",
    top: "270px",
    background: "#ADDBD0",
    border: "2px solid #E3E3E3",
    borderRadius: "3px",
    fontSize: "20px"
  }

  const button = {
    position: "absolute",
    width: "400px",
    height: "60px",
    left: "20px",
    top: "490px",
    borderRadius: "10px",
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "15px",
    border: "2px solid #E3E3E3",
    background: "#70A657",
    filter: "drop-shadow(0px 8px 10px rgba(48, 79, 254, 0.14)) drop-shadow(0px 3px 14px rgba(48, 79, 254, 0.12)) drop-shadow(0px 4px 5px rgba(48, 79, 254, 0.2))",
    cursor: "pointer"
  }

  const animais = {
  
  }
  const [hide2, sethide2] = useState(true)

  return (
    <>
    <NavBar />
    <div className='app' style={pos_calendar} >
      <h1 className='text-center'>Agenda</h1>
      <div className='calendar-container' >
        <Calendar onChange={setDate} value={date}/>
      </div>
      <p className='text-center'>
        <span className='bold'>Data escolhida:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
    <div className = 'caixa' style={pos_border}>
      <form action="/Consult" >
          <p style={text}>Intuito da consulta: </p>
          <TextInput
            multiline
            style = {textbox}
            value = {formValue.text1}
            name = "text1"
          />
          <p style={text3}>Observações: </p>
          <TextInput
            multiline
            style = {textbox2}
            value = {formValue.text2}
            name = "text2"
          />
          <p style={text2}>Espécie do animal: </p>
          <TextInput
            multiline
            style = {textbox3}
            value = {formValue.text3}
            name = "text3"
          />
          <div onClick={() => {sethide2(s => !s); handleClick()}} style = {button}>
            <p style={textB}>Confirmar Marcação</p>
          </div>
            
      </form>
    </div>
    <div className="columnimg" >
          <img src={Cao} width="300" height="100" ></img>
    </div>

    <div className="success-section">
      {!hide2 ? <SuccessTxt text={"Consulta marcada com sucesso!"} />: null}
    
    </div>
    
    </>
    
  );
  
}

