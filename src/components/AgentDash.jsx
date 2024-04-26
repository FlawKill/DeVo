import React, { useState, useEffect } from "react";
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

function AgentDashboard() {
  const [inc_count, setIncVote] = useState("");
  const [bjp_count, setBjpVote] = useState("");
  const [cpi_count, setCpiVote] = useState("");
  const [cpm_count, setCpmVote] = useState("");
  const [ncp_count, setNcpVote] = useState("");
  const [bsp_count, setBspVote] = useState("");
  const [aitc_count, setAitcVote] = useState("");
  const [aap_count, setAapVote] = useState("");
  const [winner_count, setWinnerVote] = useState("");
  const [winner_name, setWinnerName] = useState("");
  const [winnerClicked, setWinnerClicked] = useState(false);

  useEffect(() => {
    fetchTotalVote();
  }, []);

  async function fetchTotalVote() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(voterAddress, Voter.abi, signer);
      const data = await contract.tv();
      setIncVote(data[0].toNumber());
      setBjpVote(data[1].toNumber());
      setCpiVote(data[2].toNumber());
      setCpmVote(data[3].toNumber());
      setNcpVote(data[4].toNumber());
      setBspVote(data[5].toNumber());
      setAitcVote(data[6].toNumber());
      setAapVote(data[7].toNumber());
    }
  }

  async function reset() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(voterAddress, Voter.abi, signer);
    const transaction = await contract.reset();
    await transaction.wait();
    fetchTotalVote();
    setWinnerName("");
    setWinnerVote("");
    setWinnerClicked(false);
  }

  async function determineWinner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(voterAddress, Voter.abi, signer);
    const data = await contract.winner();
    setWinnerName(data[0]);
    setWinnerVote(data[1].toNumber());
    setWinnerClicked(true);
    fetchTotalVote();
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <br />
      <br />
      <h1 className="text-center mb-4 text-4xl font-bold">Agent Dashboard</h1>

      <br />

      {winnerClicked && (
        <div className="text-center mb-8 rounded-lg bg-opacity-80 bg-transparent px-4 py-2">
          <h2 className="greeting text-xl">WINNER is: {winner_name}</h2>
          {winner_name && (
            <img
              src={
                winner_name === "Indian National Congress"
                  ? inc_img
                  : winner_name === "Bhartiye Janta Party"
                  ? bjp_img
                  : winner_name === "Communist Party of India"
                  ? cpi_img
                  : winner_name === "Communist Party of India (Marxist)"
                  ? cpm_img
                  : winner_name === "Nationalist Congress Party"
                  ? ncp_img
                  : winner_name === "Bahujan Samaj Party"
                  ? bsp_img
                  : winner_name === "All India Trinamool Congress"
                  ? aitc_img
                  : winner_name === "Aam Aadmi Party"
                  ? aap_img
                  : null
              }
              alt="Winner Party"
              className="w-24 mx-auto mb-2"
            />
          )}
          <h2 className="greeting text-xl">WON by: {winner_count} Votes</h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 rounded-lg bg-opacity-80 bg-transparent px-4 py-2">
        <DashboardButtonWithImage label="INC Votes" count={inc_count} image={inc_img} />
        <DashboardButtonWithImage label="BJP Votes" count={bjp_count} image={bjp_img} />
        <DashboardButtonWithImage label="CPI Votes" count={cpi_count} image={cpi_img} />
        <DashboardButtonWithImage label="CPM Votes" count={cpm_count} image={cpm_img} />
        <DashboardButtonWithImage label="NCP Votes" count={ncp_count} image={ncp_img} />
        <DashboardButtonWithImage label="BSP Votes" count={bsp_count} image={bsp_img} />
        <DashboardButtonWithImage label="AITC Votes" count={aitc_count} image={aitc_img} />
        <DashboardButtonWithImage label="AAP Votes" count={aap_count} image={aap_img} />
      </div>

      <div className="text-center rounded-lg bg-opacity-80 bg-transparent px-4 py-2">
        <br />
        <button className="py-2 px-4 bg-red-600 text-white font-semibold rounded mr-4" onClick={reset}>
          Reset
        </button>
        <button className="py-2 px-4 bg-red-600 text-white font-semibold rounded" onClick={determineWinner}>
          Winner
        </button>
      </div>
    </div>
  );
}

const DashboardButtonWithImage = ({ label, count, image }) => (
  <div className="text-center relative">
    <img src={image} alt={label} className="w-20 mx-auto mb-2 hover:opacity-70" />
    <h2 className="greeting">{label}</h2>
    <h2 className="greeting">Count: {count}</h2>
  </div>
);

export default AgentDashboard;
