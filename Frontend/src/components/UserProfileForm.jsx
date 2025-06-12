import React, { useState, useEffect } from "react";
import "./UserProfileForm.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../app/slices/profileSlice";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUserName(user.userName || "");
    }
  }, [user]);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName }),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      await dispatch(fetchUserProfile(token));
      setStatus("success");
      setMessage("Nom d’utilisateur mis à jour avec succès.");
    } catch (error) {
      setStatus("error");
      setMessage("Échec de la mise à jour du nom d’utilisateur.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (!user) return <p>Chargement du profil...</p>;

  return (
    <form className="userProfileForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label>User name:</label>
        <input type="text" value={userName} onChange={handleUserNameChange} />
      </div>

      <div className="formGroup">
        <label>First name:</label>
        <input type="text" value={firstName} disabled  />
      </div>

      <div className="formGroup">
        <label>Last name:</label>
        <input type="text" value={lastName} disabled />
      </div>

      <div className="buttonGroup">
        <button type="submit" disabled={status === "loading"} className="buttonForm">
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
