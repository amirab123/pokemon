import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../store";
import AuthentificationGoogle from "./AuthentificationGoogle";
import "../css/signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Cet email est déjà utilisé.";
      case "auth/invalid-email":
        return "Email invalide.";
      case "auth/weak-password":
        return "Mot de passe trop faible (6 caractères minimum).";
      default:
        return "Une erreur est survenue, veuillez réessayer.";
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) return "Le nom est requis.";
    if (!emailRegex.test(email)) return "Email invalide.";
    if (password.length < 6) return "Mot de passe trop court.";
    if (!/[A-Z]/.test(password)) return "Le mot de passe doit contenir au moins une majuscule.";
    if (!/[0-9]/.test(password)) return "Le mot de passe doit contenir au moins un chiffre.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });

      const userData = {
        uid: userCred.user.uid,
        email: userCred.user.email,
        displayName: userCred.user.displayName || "Utilisateur",
        photoURL: userCred.user.photoURL,
      };

      dispatch(login({ user: userData, isSubscribed: true }));
      setSuccess(`Compte créé avec succès ! Bienvenue ${userData.displayName}`);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/favorites"), 2000);
    } catch (err) {
      setError(firebaseErrorMessage(err.code));
    }
  };

  return (
    <div className="signup-container">
      <h2>Créer un compte</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit} >
         <div className="input-group">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        </div>
         <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
          <div className="input-group">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" className="submit-btn">S’inscrire</button>
      </form>

      <hr />

      <AuthentificationGoogle onUserLogin={(userData) => dispatch(login({ user: userData, isSubscribed: true }))} />
    </div>
  );
}
