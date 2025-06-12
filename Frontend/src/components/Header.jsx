import "./header.scss";
import Logo from "../../src/assets/images/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/slices/authSlice";
import { useEffect } from "react";
import { fetchUserProfile, clearProfile } from "../app/slices/profileSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélection des infos du store Redux
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  const isAuthenticated = !!token;

  // Déconnexion : reset auth + profil
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigate("/signin");
  };

  // Appel du profil utilisateur si connecté
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  return (
    <header className={isAuthenticated ? "headerConnected" : "headerDisconnected"}>
      <nav className="headerNav">
        <Link to="/">
          <img
            src={Logo}
            alt="Argent Bank Logo"
            className={isAuthenticated ? "headerLogoConnected" : "headerLogoDisconnected"}
          />
        </Link>

        {isAuthenticated ? (
          <div className="headerUser">
            {/* Affichage dynamique du nom d'utilisateur */}
            {status === "loading" ? (
              <span className="headerUserName">Chargement...</span>
            ) : error ? (
              <span className="headerUserName">Erreur</span>
            ) : (
              <span className="headerUserName">
                {user?.userName || "Utilisateur"}
              </span>
            )}

            <i className="fas fa-user-circle headerIcon"></i>

            <Link to="/user">
              <i className="fas fa-cog headerIcon"></i>
            </Link>

            <button onClick={handleLogout} className="logoutButton" title="Déconnexion">
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
