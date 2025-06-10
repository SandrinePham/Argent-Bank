import "./hero.scss";
import HeroImage from "../../src/assets/images/bank-tree.jpeg";
import React from "react";

function Hero() {
  return (
    <section className="hero">
      <img src={HeroImage} alt="Argent Bank Logo" className="hero-img" />
      <div className="hero-content">
        <p className="hero-subtitle">
          No fees.
          <br />
          No minimum deposit.
          <br />
          High interest rates.
          <br />
        </p>
        <p className="hero-text">Open a savings account with Argent Bank today!</p>
      </div>
    </section>
  );
}

export default Hero;
