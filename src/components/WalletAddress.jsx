import React, { useState } from 'react';

const WalletAddress = ({ address }) => {
  const [showFullAddress, setShowFullAddress] = useState(false);

  const toggleAddress = () => {
    setShowFullAddress(!showFullAddress);
  };

  return (
    <div className="flex items-center cursor-pointer border border-white rounded px-4 py-2" onClick={toggleAddress}>
      {showFullAddress ? (
        <span className="text-white">{address}</span>
      ) : (
        <span className="text-white">{address.slice(0, 15)}...</span>
      )}
    </div>
  );
};

export default WalletAddress;