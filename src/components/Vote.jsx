import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Voter from "../artifacts/contracts/Voter.sol/Voter.json";
import inc_img from "../images/Congress-Logo.png";
import bjp_img from "../images/bjp_logo.png";
import cpi_img from "../images/CPI.jpg";
import cpm_img from "../images/CPIM.png";
import ncp_img from "../images/NCP.jpg";
import bsp_img from "../images/BSP.png";
import aitc_img from "../images/AITC.png";
import aap_img from "../images/aap.png"; 

const voterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Vote() {
  const navigate = useNavigate();
  const [currentVote, setCurrentVote] = useState("Please Vote");
  const [isVoting, setIsVoting] = useState(false);
  const [redirectTime, setRedirectTime] = useState(30);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [totalVoted, setTotalVoted] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [showHomePageButton, setShowHomePageButton] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchVote() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(voterAddress, Voter.abi, provider);
      const data = await contract.show();
      setCurrentVote(data);
    }
  }

  async function fetchTotalVote() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(voterAddress, Voter.abi, signer);
      const data = await contract.tv();
      
      const totalVoted = data.reduce((acc, count) => acc + count.toNumber(), 0);
      setTotalVoted(totalVoted);
    }
  }

  async function vote(candidate) {
    if (!isVoting && typeof window.ethereum !== "undefined" && !hasVoted) {
      setIsVoting(true);
      setHasVoted(true);
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(voterAddress, Voter.abi, signer);
      const transaction = await contract.vote(candidate);
      await transaction.wait();
      fetchVote();
      setIsVoting(false);
      setRedirectTime(30);
      setShowHomePageButton(true);
    }
  }
  
  useEffect(() => {
    fetchTotalVote();
  }, []);

  useEffect(() => {
    if (totalVoted > 0 && redirectTime > 0) {
      const timer = setTimeout(() => {
        setRedirectTime(prevTime => prevTime - 1);
        setRedirectMessage(`Please Vote and Verify Within ${redirectTime} seconds...`);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (totalVoted > 0 && redirectTime === 0) {
      navigate('/');
    }
  }, [totalVoted, redirectTime, navigate]);

  const goToHomePage = () => {
    const goToHome = window.confirm("Are you sure you want to go to the Home Page?");
    if (goToHome) {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="text-center mb-8 rounded-lg bg-opacity-80 bg-transparent px-4 py-2">
        <br></br>
      <h1 className="text-3xl font-bold">General Elections 2024</h1>
        <h2 className="text-lg">Election Phase - 1</h2>
      </div>

      {redirectTime > 0 && (
        <div className="container mx-auto p-4 bg-gray-900 text-lg text-white rounded-lg">
          <h3>{redirectMessage}</h3>
        </div>
      )}
      <br></br>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <VoteButton image={inc_img} label="Indian National Congress" onClick={() => vote(1)} disabled={hasVoted} />
        <VoteButton image={bjp_img} label="Bhartiye Janta Party" onClick={() => vote(2)} disabled={hasVoted} />
        <VoteButton image={cpi_img} label="Communist Party of India" onClick={() => vote(3)} disabled={hasVoted} />
        <VoteButton image={cpm_img} label="Communist Party of India (Marxist)" onClick={() => vote(4)} disabled={hasVoted} />
        <VoteButton image={ncp_img} label="Nationalist Congress Party" onClick={() => vote(5)} disabled={hasVoted} />
        <VoteButton image={bsp_img} label="Bahujan Samaj Party" onClick={() => vote(6)} disabled={hasVoted} />
        <VoteButton image={aitc_img} label="All India Trinamool Congress" onClick={() => vote(7)} disabled={hasVoted} />
        <VoteButton image={aap_img} label="Aam Aadmi Party" onClick={() => vote(8)} disabled={hasVoted} />
      </div>

      <div className="text-center mb-4 text-2xl rounded-lg bg-opacity-80 bg-transparent px-4 py-2">
        <div className="greeting">{currentVote}</div>
      </div>

      {showHomePageButton && (
        <button className="py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded" onClick={goToHomePage}>
          Exit The Pannel
        </button>
      )}
    </div>
  );
}

const VoteButton = ({ image, label, onClick, disabled }) => (
  <button className="py-2 px-4 bg-blue-600 text-white font-semibold rounded" onClick={onClick} disabled={disabled}>
    <img src={image} className="h-10 mx-auto mb-2" alt={label} />
    {label}
  </button>
);

export default Vote;
