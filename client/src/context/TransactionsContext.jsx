import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../utils/constants";

export const TransactionsContext = createContext();

const TransactionProvider = ({ children }) => {
  const [isWalletConnected, setWallectConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const { ethereum } = window;

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) alert("Please Install Metamask to continue.");
    const account = await ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setWallectConnected(true);
      setAccount(account[0]);
    }
  };

  const connectToWallet = async () => {
    if (!ethereum) alert("Please Install Metamask to continue.");
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(account);
    setAccount(account[0]);
  };

  const getContract = () => {
    const provider = new ethers.AlchemyProvider(
      "sepolia",
      "ngOTeUDmcWdLVbKd7ciFWCcFHalapfC3"
    );
    const proxy = new ethers.Contract(contractAddress, abi, provider);
    const transactionContract = proxy.connect(provider);

    return transactionContract;
  };

  const sendMoney = async (data) => {
    const contract = getContract();
    if (!data.address || !data.amount) return;
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: data.address,
          gas: "0x5208",
          value: ethers.parseUnits(data.amount)._hex,
        },
      ],
    });
    const txnHash = await contract.sendMoney(
      data.address,
      ethers.parseUnits(data.amount)._hex,
      data.message
    );
    await txnHash.wait();
    console.log(txnHash.hash);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        isWalletConnected,
        connectToWallet,
        account,
        getContract,
        sendMoney,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionProvider;
