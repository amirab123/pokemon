import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import logogoogle from "../assets/google.png";
export default function AuthentificationGoogle() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/favorites";

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        console.log("✅ Utilisateur connecté via Google :", userData);

        setUser(userData);

  
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("❌ Erreur connexion Google :", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="google-login">
      {user ? (
        <div>
          <p>Connecté en tant que : {user.displayName}</p>
        </div>
      ) : (
        <button onClick={handleGoogleLogin} className="google-btn">
            <img src={logogoogle} alt="logo"   />  Se connecter avec Google
        </button>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
