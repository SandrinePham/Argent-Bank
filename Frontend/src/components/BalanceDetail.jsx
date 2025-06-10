import React, { useState } from "react";
import "./BalanceDetail.scss";

const BalanceDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="balanceDetail">
      <div className="balanceContent">
        <div className="balanceDetailHeader">
          <p className="detailText">Date</p>
          <p className="detailText">Description</p>
        </div>
        <div className="balanceDetailFooter">
          <p className="detailText">Amount</p>
          <p className="detailText">Balance</p>
          <button onClick={() => setIsOpen(!isOpen)} className="detailBtn">
            <i
              className={`fas ${isOpen ? "fa-angle-up" : "fa-angle-down"}`}
            ></i>
          </button>
        </div>
      </div>
      {isOpen && <p>Voici le contenu repliable.</p>}
    </section>
  );
};

export default BalanceDetail;
