import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login.svg";
import backgroundImage from "../assets/log-background.jpg"; 
import Login from "./Login-Dash"

const Register = ({ containerRef }) => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
    navigate("/login");
  };

  return (
    <div className="base-container flex flex-col items-center h-screen" ref={containerRef} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className=" mt-20">
        <div className="content flex flex-col items-center">
          <div className="image w-64">
            <img src={loginImg} alt="Register" className="w-full" />
          </div>
          <div className="form mt-8 text-black w-64">
            <div className="form-group mb-4">
              <label htmlFor="username" className="text-lg text-white">Voter ID</label>
              <input type="text" name="username" placeholder="Voter ID" className="mt-2 w-full px-4 py-2 text-lg bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email" className="text-lg text-white">Aadhaar Number</label>
              <input type="text" name="email" placeholder="Aadhaar Number" className="mt-2 w-full px-4 py-2 text-lg bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="text-lg text-white">Password</label>
              <input type="password" name="password" placeholder="password" className="mt-2 w-full px-4 py-2 text-lg bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>
          </div>
        </div>
        <div className="footer mt-12">
        <button type="button" className="py-2 px-6 bg-blue-800 text-white font-semibold rounded hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-900" onClick={handleLoginClick}>
  Login
</button>

        </div>
        
        {showLogin && <Login />}
      </div>
    </div>
  );
};

export default Register;
