import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import loginImg from '../assets/login.svg';
import Vote from './Vote'; // Import the VotingComponent

const Login = () => {
  const [showVote, setShowVote] = useState(false); // Initialize showVote state
  const navigate = useNavigate();

  const handleVoteClick = () => {
    setShowVote(true);
    navigate("/vote"); // Navigate to "/vote" route
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-xl font-semibold mb-4">Login</div>
      <div className="flex flex-col items-center">
        <div className="w-64">
          <img src={loginImg} alt="Login" className="w-full" />
        </div>
        <div className="mt-8 w-64">
          <div className="mb-4">
            <label htmlFor="username" className="text-lg">Voter ID</label>
            <input type="text" name="username" placeholder="Voter ID" className="mt-2 w-full px-4 py-2 text-lg bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-800" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg">Password</label>
            <input type="password" name="password" placeholder="password" className="mt-2 w-full px-4 py-2 text-lg bg-gray-100 rounded focus:outline-none focus:ring focus:border-blue-800" />
          </div>
        </div>
      </div>
      <div className="mt-12">
        {showVote ? <Vote /> : (
          <button type="button" className="py-2 px-6 bg-blue-800 text-white font-semibold rounded hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-800" onClick={handleVoteClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
