import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import WalletAddress from './WalletAddress'; 

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [account, setAccount] = useState("");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    setButton(window.innerWidth > 960);
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  const connectWallet = () => {
    if (window.ethereum && !account) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const acc = accounts[0];
          setAccount(acc);
          localStorage.setItem('walletAddress', acc);
        })
        .catch(error => {
          console.error('Error requesting accounts:', error);
        });
    }else {
      console.error('MetaMask not detected.');
    }
  };

 

  return (
    <nav className='bg-gradient-to-r from-gray-800 to-gray-900 h-20 flex justify-between items-center text-xl sticky top-0 z-50 gap-10'>
      <div className='ml-[5vw]'>
        <Link to='/' className='text-white text-2xl font-bold flex items-center'>
          DeVo
          <i className='fab fa-typo3 text-2xl ml-2' />
        </Link>
      </div>
      <div className='md:hidden' onClick={handleClick}>
        <i className={click ? 'fas fa-times text-white text-2xl' : 'fas fa-bars text-white text-2xl'} />
      </div>
      <div className='mr-[5vw]'>
        <ul className={click ? 'flex flex-col items-center bg-gray-900 w-full py-4' : 'hidden md:flex md:flex-row md:items-center md:bg-transparent'}>
          <li className='py-2 md:py-0'>
            <Link to='/' className='text-white px-4 md:px-2' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='py-2 md:py-0'>
            <a href='https://www.eci.gov.in/election-management' className='text-white px-4 md:px-2' target='_blank' rel='noopener noreferrer' onClick={closeMobileMenu}>
              ECI
            </a>
          </li>
          <li>
            <Link to='/agentlogin'  className='text-white px-4 md:px-2' onClick={closeMobileMenu}>
              Commission
            </Link>
          </li>
          <li className='py-2 md:py-0'>
            {account ? (
              <>
                <WalletAddress address={account} />
              </>
            ) : (
              <button className='text-white px-4 md:px-2' onClick={connectWallet}>
                Wallet
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;