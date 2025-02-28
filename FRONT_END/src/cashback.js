import axios from "axios";
import { useState, useEffect } from "react";

export default function Cashback() {
  let [user, setUser] = useState(null);
  let [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/data").then((res) => {
      let lastUser = res.data[res.data.length - 1];
      setUser(lastUser);
    });
  }, []);

  function handleCashback(e) {
    e.preventDefault();
    if (!user) return;

    let updatedUser = { ...user, amount: user.amount - Number(amount) };
    axios.put(`http://localhost:8080/update/${user._id}`, updatedUser).then(() => {
      setUser(updatedUser);
    });
  }

  return (
    <>
      <h1>Cashback</h1>
      {user && (
        <>
          <form onSubmit={handleCashback}>
            <input type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <button type="submit">Cashback</button>
          </form>
          <h2>Balance: {user.amount}</h2>
        </>
      )}
    </>
  );
}
