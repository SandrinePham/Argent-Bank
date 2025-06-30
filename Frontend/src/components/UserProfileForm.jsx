import React, { useState, useEffect } from "react";
import "./UserProfileForm.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../app/slices/profileSlice";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const user = useSelector((state) => state.profile.user);

  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // Charger le profil si nécessaire
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [token, user, dispatch]);

  // Mettre à jour le champ userName quand les données sont chargées
  useEffect(() => {
    if (user?.userName) {
      setUserName(user.userName);
    }
  }, [user]);

  const handleUserNameChange = (e) => setUserName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      setStatus("error");
      setMessage("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const resultAction = await dispatch(updateUserProfile({ userName }));

      if (updateUserProfile.fulfilled.match(resultAction)) {
        await dispatch(fetchUserProfile());
        setStatus("success");
        setMessage("Nom d’utilisateur mis à jour avec succès.");
      } else {
        throw new Error(resultAction.payload || "Erreur inconnue");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Échec de la mise à jour du nom d’utilisateur.");
    }
  };

  const handleCancel = () => navigate("/dashboard");

  if (!token) return <p>Vous devez être connecté pour voir ce contenu.</p>;

  return (
    <form className="userProfileForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label>User name:</label>
        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          disabled={status === "loading"}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="firstName">First name:</label>
        <input id="firstName" type="text" value={firstName || ""} disabled />
      </div>

      <div className="formGroup">
        <label htmlFor="lastName">Last name:</label>
        <input id="lastName" type="text" value={lastName || ""} disabled />
      </div>
      <div className="buttonGroup">
        <button
          type="submit"
          className="buttonForm"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sauvegarde..." : "Save"}
        </button>
        <button type="button" onClick={handleCancel} className="buttonForm">
          Cancel
        </button>
      </div>

      {message && <p className={status}>{message}</p>}
    </form>
  );
};

export default UserProfileForm;
