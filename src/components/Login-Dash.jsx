import React, { useState } from 'react';
import VoterLogin from './Voter-Login'; 
import AgentLogin from './Agent-login'; 
import background from '../assets/log-background.jpg'; 

const LoginPage = () => {
  const [loginOption, setLoginOption] = useState(null);

  const handleOptionSelect = (option) => {
    setLoginOption(option);
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-transparent text-white border-white-50 p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4">Select User Type</h2>
        <div className="flex items-center justify-between mb-4">
          <button className={`px-10 py-3 rounded-full focus:outline-none ${loginOption === 'voter' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleOptionSelect('voter')}>
            Voter
          </button>
          <button className={`px-10 py-3 rounded-full focus:outline-none ${loginOption === 'agent' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => handleOptionSelect('agent')}>
            Agent
          </button>
        </div>
        {loginOption === 'voter' && <VoterLogin />}
        {loginOption === 'agent' && <AgentLogin />}
      </div>
    </div>
  );
};

export default LoginPage;
