import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import StartHome from './pages/LetsStart/StartHome';
import Home from "./pages/Home"
import HeroLogin from "./components/HeroLogSign/HeroLogin";
import UserProfile from "./pages/UserProfile";
import React from "react";
import Layout from "./pages/Layout";
import OtherProfilePages from "./pages/OtherProfilePages";
import TripHistory from "./pages/tripsHistory/TripHistory";
import useAuth from './hooks/useAuth';
import HeroSign from "./components/HeroSignUp/HeroSign";
import NotificationIcon from "./components/NotificationIcon";


const Private = ({ Item }) =>{
	const {signed} =HeroLogin();
	console.log(signed)
  
	return signed == "undefined" ? <Item/> : <HeroLogin/>; 
  
  }

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" exact element={<StartHome />} />
					<Route path="/LogSign" exact element={<HeroLogin/>}></Route>
              		<Route path="/SignUp" exact element={<HeroSign/>}></Route>
					{/* <Route path="/home" exact element={<Home />} /> */}
					<Route path="/home" exact element={<Private Item={Home}/>}/>
					<Route path="/userProfile" exact element={<Private Item={UserProfile}/>} />
					<Route path="*" element={<HeroLogin />} />
					<Route path="/othersProfile/*" element={<Private Item={OtherProfilePages}/>} />
					<Route path="/history" exact element={<Private Item={TripHistory}/>}></Route>
					<Route path="/notifications" exact element={<Private Item={NotificationIcon}/>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
