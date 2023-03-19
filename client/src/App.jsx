import { useState, useContext } from "react";
import "./App.css";
import { TransactionsContext } from "./context/TransactionsContext";

const Input = (props) => {
  return (
    <input
      style={{
        margin: "10px 0px",
        padding: "15px",
        width: "350px",
      }}
      {...props}
    />
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button
      style={{
        padding: "15px",
        background: "#5D3891",
        textAlign: "center",
        margin: "10px 0px",
        width: "350px",
        cursor: "pointer",
        borderRadius: "35px",
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <p
        style={{
          color: "white",
        }}
      >
        {children}
      </p>
    </button>
  );
};

const App = () => {
  const { isWalletConnected, connectToWallet, sendMoney } =
    useContext(TransactionsContext);

  const [trasactionDetails, setTransactionDetails] = useState({
    address: "",
    amount: "",
    message: "",
  });

  const onChangeTransactions = (e) => {
    e.preventDefault();
    setTransactionDetails({
      ...trasactionDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      {isWalletConnected ? (
        <div className="container">
          <h1>Simple Eth Transfer DApp</h1>
          <Input
            name="address"
            value={trasactionDetails.address}
            placeholder="address"
            onChange={onChangeTransactions}
          />
          <Input
            name="amount"
            value={trasactionDetails.amount}
            placeholder="amount"
            onChange={onChangeTransactions}
          />
          <Input
            name="message"
            value={trasactionDetails.message}
            placeholder="message"
            onChange={onChangeTransactions}
          />
          <Button onClick={() => sendMoney(trasactionDetails)}>Send</Button>
        </div>
      ) : (
        <div className="container">
          <h1>Simple Eth Transfer DApp</h1>
          <Button onClick={connectToWallet}>Connect Wallet</Button>
        </div>
      )}
    </div>
  );
};

export default App;
