import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../app/slices/profileSlice";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  // Initialiser avec localStorage si Redux n'a pas firstName/lastName
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "");
  const [lastName, setLastName] = useState(localStorage.getItem("lastName") || "");
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token && !user?.userName) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user.userName || "");
      // firstName et lastName ne viennent pas du profil, on ne modifie pas ici
    }
  }, [user]);

  const handleUserNameChange = (e) => setUserName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setMessage("Le nom d'utilisateur ne peut pas être vide.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const resultAction = await dispatch(updateUserProfile({ token, userName }));
      if (updateUserProfile.fulfilled.match(resultAction)) {
        await dispatch(fetchUserProfile(token));
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

  if (!user && status !== "loading") return <p>Chargement du profil...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User name:</label>
        <input type="text" value={userName} onChange={handleUserNameChange} disabled={status === "loading"} />
      </div>

      <div>
        <label>First name:</label>
        <input type="text" value={firstName} disabled />
      </div>

      <div>
        <label>Last name:</label>
        <input type="text" value={lastName} disabled />
      </div>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sauvegarde..." : "Save"}
      </button>
      {message && <p className={status}>{message}</p>}
    </form>
  );
};

export default UserProfileForm;
