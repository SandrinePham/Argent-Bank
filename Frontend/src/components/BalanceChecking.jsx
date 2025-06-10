import React from "react";
import "./balanceChecking.scss";

function BalanceChecking() {
  return (
    <section className="balanceChecking">
      <div className="balanceText">
        <h2>Argent Bank Checking (x3448)</h2>
        <p className="balanceTotal">$48,098.43</p>
        <p>Available balance</p>
      </div>
      <div>
        <i className="fa fa-times"></i>
      </div>
    </section>
  );
}

export default BalanceChecking;
