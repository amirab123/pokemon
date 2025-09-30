import React from "react";
import "../css/Footer.css";
import PikachuIcon from "../assets/pikachu.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-title">
      <img src={PikachuIcon} alt="Logo Pokémon" className="logo-img" />
      Pokémon
    </div>

    <nav className="footer-links">
      <Link to="/">Accueil</Link>
        <Link to="/login">Se Connecter</Link>
        <Link to="/signup">S'inscrire</Link>

      
    </nav>

    <div className="footer-socials">
      <span>Suivez-nous :</span>
      <a href="#"><img src={facebook} alt="Facebook" className="icon" /></a>
      <a href="#"><img src={twitter} alt="Twitter" className="icon" /></a>
      <a href="#"><img src={instagram} alt="Instagram" className="icon" /></a>
    </div>
  </div>

  <div className="footer-bottom">
    © 2025 Pokémon. Tous droits réservés par  Cégep de Trois-Rivières 
  </div>
</footer>

  );
}
