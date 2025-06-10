import "./header.scss";
import Logo from "../../src/assets/images/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

function Header() {
  const { token, logout } = useContext(AuthContext);
  const { userName, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const isAuthenticated = !!token;

  return (
    <header
      className={isAuthenticated ? "headerConnected" : "headerDisconnected"}
    >
      <nav className="headerNav">
        <Link to="/">
          <img
            src={Logo}
            alt="Argent Bank Logo"
            className={
              isAuthenticated ? "headerLogoConnected" : "headerLogoDisconnected"
            }
          />
        </Link>

        {isAuthenticated ? (
          <div className="headerUser">
            {/* Affichage du nom d'utilisateur */}
            {loading ? (
              <span className="headerUserName">Chargement...</span>
            ) : error ? (
              <span className="headerUserName">Erreur</span>
            ) : (
              <span className="headerUserName">
                {userName || "Utilisateur"}
              </span>
            )}
            <i className="fas fa-user-circle headerIcon"></i>

            <Link to="/user">
              <i className="fas fa-cog headerIcon"></i>
            </Link>

            <button
              onClick={handleLogout}
              className="logoutButton"
              title="Déconnexion"
            >
              <i className="fas fa-power-off headerIcon"></i>
            </button>
          </div>
        ) : (
          <Link to="/signin" className="signinLink">
            <i className="fas fa-user-circle headerIcon"></i> Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
