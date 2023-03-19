import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import StartHome from './pages/LetsStart/StartHome';
import Home from "./pages/Home"
import HeroLogin from "./components/HeroLogSign/HeroLogin";
import UserProfile from "./pages/UserProfile";
import React from "react";
import Layout from "./pages/Layout";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" exact element={<StartHome />} />
					<Route path="/home" exact element={<Home />} />
					<Route path="/userProfile" exact element={<UserProfile />} />
					<Route path="*" element={<HeroLogin />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
