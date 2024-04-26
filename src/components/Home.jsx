import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/b-061.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);

  const handleBeginClick = () => {
    navigate("/vote");
  };

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const acc = accounts[0];
          console.log(acc);
          localStorage.setItem('walletAddress', acc);
          setWalletConnected(true);
        })
        .catch(error => {
          console.error('Error connecting wallet:', error);
          // Provide feedback to the user about the error
          // For example, display a toast or a modal with the error message
        });
    } else {
      console.error('MetaMask not detected.');
      // Inform the user that MetaMask is required for wallet connection
    }
  };

  return (
    <div>
      <div
        className="h-screen flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 text-center">Welcome to the E-Voting Website</h1>
        <h2 className="text-white text-2xl md:text-3xl mb-6 text-center">
          <strong>
            Transforming the Electoral process into more transparent and trustable...
          </strong>
        </h2>
        <h2 className="text-white text-lg md:text-xl text-center mb-8">
          Connecting Democracy with Enchantments and wonders of technology...
        </h2>
        <div className="mt-20">
          <p className="text-white text-xl md:text-2xl text-center mt-20">Let's begin the voting journey with <strong>Blockchain Technology</strong></p>
        </div>
        <br/>
        {!walletConnected ? (
          <button className="p-[3px] relative mt-10" onClick={connectWallet}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Connect Wallet
            </div>
          </button>
        ) : (
          <button className="p-[3px] relative mt-10" onClick={handleBeginClick}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Let's Begin...
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
