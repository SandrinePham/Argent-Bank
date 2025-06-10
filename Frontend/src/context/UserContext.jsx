import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // On récupère le token ici
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setUserName(null);
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,  // On envoie le token
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil utilisateur");
        }
        const data = await response.json();
        setUserName(data.userName); // Adapter selon ta réponse backend
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <UserContext.Provider value={{ userName, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
