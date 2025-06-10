// src/App.jsx
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/AuthContext"; // importe le provider
import { UserProvider } from "./context/UserContext";
import User from "./pages/User"; // Assurez-vous d'importer la page User si nécessaire
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/user" element={<User />} />{" "}
              {/* Route pour la page utilisateur */}
              {/* Ajoute d'autres routes ici si besoin */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
