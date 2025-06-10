import { useState, useEffect } from "react";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Exemple : vérifie la présence d'un token dans le localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
}

export default useAuth;