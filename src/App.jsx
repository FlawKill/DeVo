import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
// import Contact from "./components/Contact";
import RegisterDash from "./components/Register-Dash"; // Changed to PascalCase
import Agent from "./components/AgentDash";
import Login from "./components/Agent-login";
import VotingComponent from "./components/Vote";


function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className=" text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/agentlogin" element={<Login />} />
        <Route path="/register" element={<RegisterDash />} /> {/* Changed to PascalCase */}
        <Route path="/vote" element={<VotingComponent />} /> 
      </Routes>
      </div> 

    </BrowserRouter>
    
  );
}

export default App;
