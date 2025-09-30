import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../store";
import AuthentificationGoogle from "./AuthentificationGoogle";
import "../css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/favorites";

  const dispatch = useDispatch();

  const firebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "Aucun compte trouvé avec cet e-mail.";
      case "auth/wrong-password":
        return "Mot de passe incorrect.";
      case "auth/invalid-email":
        return "Adresse e-mail invalide.";
      default:
        return "Une erreur est survenue. Veuillez réessayer.";
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      // Mise à jour Redux
      const userData = {
        uid: userCred.user.uid,
        email: userCred.user.email,
        displayName: userCred.user.displayName || "Utilisateur",
        photoURL: userCred.user.photoURL,
      };
      dispatch(login({ user: userData, isSubscribed: true }));

      setSuccess("Connexion réussie !");
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setError(firebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Se connecter</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleEmailLogin} className="login-form">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse e-mail"
            required
            autoFocus
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <hr />

      <AuthentificationGoogle
        onUserLogin={(userData) => dispatch(login({ user: userData, isSubscribed: true }))}
      />
    </div>
  );
}
