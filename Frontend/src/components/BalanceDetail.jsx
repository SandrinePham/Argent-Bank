import React, { useState } from "react";
import "./BalanceDetail.scss";

const BalanceDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="balanceDetail">
      {/* En-tête fixe */}
      <div className="balanceHeaderRow">
        <p className="detailText">Date</p>
        <p className="detailText">Description</p>
        <p className="detailText">Amount</p>
        <p className="detailText">Balance</p>
        <button className="detailBtnHeader">
          <i className="fas fa-angle-up"></i>
        </button>
      </div>

      {/* Ligne transaction + collapse */}
      <div className="balanceContent">
        <div className="balanceRow">
          <p className="detailText">27/02/20</p>
          <p className="detailText">Golden Sun Bakery</p>
          <p className="detailText">$8.00</p>
          <p className="detailText">$298.00</p>
          <button onClick={() => setIsOpen(!isOpen)} className="detailBtn">
            <i
              className={`fas ${isOpen ? "fa-angle-up" : "fa-angle-down"}`}
            ></i>
          </button>
        </div>

        {isOpen && (
          <div className="collapseContent">
            <p>Voici le contenu repliable.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BalanceDetail;
