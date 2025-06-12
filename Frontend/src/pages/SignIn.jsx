import "./signin.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // ✅ Redirection automatique si connecté
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) return;

    dispatch(login({ email, password }));
  };

  return (
    <main className="signin-page">
      <section className="signin-content">
        <i className="fa fa-user-circle signin-icon"></i>
        <h2>Sign In</h2>

        {authStatus === "failed" && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
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

          <button
            type="submit"
            className="signin-button"
            disabled={authStatus === "loading"}
          >
            {authStatus === "loading" ? "Connexion..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
