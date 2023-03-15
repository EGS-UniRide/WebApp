import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import './App.css';
import StartHome from './pages/LetsStart/StartHome';
import Home from "./pages/Home"
import Encomenda from "./pages/Encomenda"
import AddTrip from './pages/AddTrip';
import { AuthProvider } from './contexts/auth';
import useAuth from './hooks/useAuth';
import HeroLogin from "./components/HeroLogSign/HeroLogin";
import HeroSign from "./components/HeroSignUp/HeroSign";
import UserProfile from "./pages/UserProfile";
import tripHistory from "./components/tripHistory";

import React from "react";
import Notifications from "./pages/Notifications";


const App = () => {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route path="/" exact element={<StartHome/>} />
              <Route path="/home" exact element={<Home/>}/>
              {/* <Route path="/Encomenda" exact element={<Encomenda/>}/> */}
              <Route path="/userProfile" exact element={<UserProfile/>}/>
              <Route path="/heroLogin" exact element={<HeroLogin/>}/>
              <Route path="*" element={<HeroLogin />} />
              <Route path="/notifications" exact element={<Notifications/>}/>
              <Route path="/tripHistory" exact element={<tripHistory/>}/>
              <Route path="/addTrip" exact element={<AddTrip/>}/>
              {/*<Route path="/addClinicFile" exact element={<AddClinicFilePage/>}/>
              <Route path="*" element={<HeroLogin />} />
              <Route path="/Consult" exact element={<Consult/>}/> */}
           </Routes>
          </Fragment>
       </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
