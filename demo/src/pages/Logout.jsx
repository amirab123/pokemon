// Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store";
import { auth } from "../firebase";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);          
        dispatch(logout());            
        navigate("/login");            
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div className="logout-container">
      <h2>Déconnexion...</h2>
    </div>
  );
}
