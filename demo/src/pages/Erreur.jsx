import React from "react";
import { Link } from "react-router-dom";
import "../css/PageErreur.css"; 

export default function Erreur() {
  return (
    <div className="page-erreur">
      <h1>404 — Page non trouvée</h1>
      <p>La page demandée n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}
