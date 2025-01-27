import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useContract = (contractAddress, contractABI) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      setProvider(_provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) throw new Error("MetaMask not detected");
    const accounts = await provider.send("eth_requestAccounts", []);
    const _signer = provider.getSigner();
    setSigner(_signer);

    const _contract = new ethers.Contract(contractAddress, contractABI, _signer);
    setContract(_contract);

    return { address: accounts[0], signer: _signer, contract: _contract };
  };

  const disconnectWallet = () => {
    // Réinitialiser uniquement le signer et le contrat
    setSigner(null);
    setContract(null);
  
    // Nettoyer les listeners associés à MetaMask
    if (window.ethereum?.removeAllListeners) {
      window.ethereum.removeAllListeners();
    }
  };

  return { connectWallet, disconnectWallet, contract, provider, signer };
};

export default useContract;
