import React, { useState } from 'react';
import AgentSVG from '../assets/agent.svg';
import { useNavigate } from "react-router-dom";
import background from '../assets/log-background.jpg'; 

const Login = ({ containerRef }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleBeginClick = () => {
    // Check if the entered ID and password match the predefined values
    if (username === "123456789" && password === "Dayal") {
      navigate("/agent");
    } else {
      alert("Invalid ID or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="text-xl items-center justify center -mt-10 font-semibold mb-4 text-white">Login</div>
      <div className="flex flex-col items-center">
        <div className="w-64">
          <img src={AgentSVG} alt="Login" className="w-full" />
        </div>
        <div className="mt-8 w-64">
          <div className="mb-4">
            <label htmlFor="username" className="text-lg text-white">Officer ID</label>
            <input type="text" name="username" placeholder="ID" className="mt-2 w-full px-4 py-2 text-lg text-black bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-300" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg text-white">Password</label>
            <input type="password" name="password" placeholder="Password" className="mt-2 w-full px-4 py-2 text-lg text-black bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-300" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <div className="mt-8">
          <button type="button" className="py-2 px-6 bg-blue-800 text-white font-semibold rounded hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-900" onClick={handleBeginClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
