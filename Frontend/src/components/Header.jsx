import "./header.scss";
import Logo from "../../src/assets/images/argentBankLogo.png";
import { Link } from "react-router-dom";
import useAuth from "../hook/UseAuth";

function Header() {
  const isAuthenticated = useAuth();
  return (
    <>
      {!isAuthenticated ? (
        <header className="headerDisconnected">
          <nav>
            <Link to="/">
              <img src={Logo} alt="Argent Bank Logo" className="headerLogoDisconnected" />
            </Link>
          </nav>
          <h1 className="sr-only">Argent Bank</h1>
          <div className="headerSignin">
            <i className="fa fa-user-circle"></i>
            <nav>
              <Link to="/signin">Sign In</Link>
            </nav>
          </div>
        </header>
      ) : (
        // À personnaliser : ce qui s'affiche si l'utilisateur est connecté
        <header className="headerConnected">
          {/* Ton contenu pour utilisateur connecté ici */}
          <p>Bienvenue, utilisateur connecté !</p>
        </header>
      )}
    </>
  );
}
export default Header;
