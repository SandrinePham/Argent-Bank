// src/pages/SignIn.jsx
import "./signin.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setError("Merci de remplir tous les champs.");
      return;
    }

    // ✅ Simule une connexion réussie
    setError("");
    console.log("Authentifié :", formData);
    navigate("/user");
  };

  return (
    <main className="signin-page">
      <section className="signin-content">
        <i className="fa fa-user-circle signin-icon"></i>
        <h1>Sign In</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
