import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

const counterABI = [
  {
    "type": "function",
    "name": "increment",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "number",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setNumber",
    "inputs": [
      {
        "name": "newNumber",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
];

function App() {
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState('');

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Configure MetaMask to connect to Anvil
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                /* 启动 anvil 输出如下所示，31337需要转为16进制
                Chain ID
                ==================

                31337
                */
                chainId: '0x7A69',
                chainName: 'Anvil',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
              },
                rpcUrls: ['http://localhost:8545'],
            }]
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // 替换为你的合约地址
          const counterContract = new ethers.Contract(contractAddress, counterABI, signer);
          setContract(counterContract);
          updateNumber();
        } catch (error) {
          console.error("Failed to initialize:", error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    init();
  }, []);

  const updateNumber = async () => {
    if (contract) {
      try {
        const currentNumber = await contract.number();
        setNumber(currentNumber.toString());
      } catch (error) {
        console.error("Failed to get number:", error);
      }
    }
  };

  const handleIncrement = async () => {
    if (contract) {
      try {
        const tx = await contract.increment();
        await tx.wait();
        updateNumber();
      } catch (error) {
        console.error("Failed to increment:", error);
      }
    }
  };

  const handleSetNumber = async () => {
    if (contract && inputNumber !== '') {
      try {
        const tx = await contract.setNumber(inputNumber);
        await tx.wait();
        updateNumber();
        setInputNumber('');
      } catch (error) {
        console.error("Failed to set number:", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Counter DApp</h1>
      <p>Current Number: {number}</p>
      <button onClick={handleIncrement}>Increment</button>
      <br />
      <input 
        type="number" 
        value={inputNumber} 
        onChange={(e) => setInputNumber(e.target.value)}
        placeholder="Enter a number"
      />
      <button onClick={handleSetNumber}>Set Number</button>
    </div>
  );
}

export default App;