import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "./home.png";
import "./herosection.css";


const button2 = {
        alignItems: 'center',
        display: "table",
        paddingVertical: 12,
        width: 150,
        paddingHorizontal: 14,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor:"black",
        float: 'left',
}

const text2 ={
    fontSize: 16,
    lineHeight: 3,
    marginLeft:45,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
}
const button1 = {
    alignItems: 'center',
    display: "table",
    paddingVertical: 12,
    width: 150,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: 'black',
    float: 'left',
  }

  const text= {
    fontSize: 16,
    lineHeight: 3,
    marginLeft: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }



const Herosection = () => {

 

  return (
    <div className="home" >
      <div className="headerContainer">
        <h1> UniRide </h1>
        <p> Expand your network, make new friends and share a ride. </p>
        <p className= "a"> Help yourself saving, or gaining, some money.
        AAAAAAAAAAAAAAAAAAAAAAaa </p>
        <div className="buttom">
            <Link to="/LogSign" style={button1}>
              <div id="g_id_onload"
                  data-client_id="782166404546-fcq3gu48l2a3q5fvqhrktq853m112s1h.apps.googleusercontent.com"
                  data-context="signin"
                  data-login_uri="http://127.0.0.1:1337/"
                  data-itp_support="true">
              </div> 
            </Link> 
            {/*<Link to="/SignUp" style={button2}>
                <a style={text2}>Sign up</a>
            </Link>*/}
        </div>
        
      </div>
      <div className="column">
          <img src={BannerImage} width="500" height="500"></img>
      </div>

    </div>
  );
}

export default Herosection;