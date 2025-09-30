import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store"; 
import PikachuIcon from "../assets/pikachu.png";
import "../css/NavBar.css";

export default function NavBar() {
  const { user, isSubscribed } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <img src={PikachuIcon} alt="Logo" className="logo-icon" />
          Pokémon
        </Link>

 
        <div className="navbar-links">
          {user ? (
            <>
              <span>Bienvenue, {user.displayName ?? user.email}</span>
              {isSubscribed && <Link to="/add-favorite">Ajouter Favori</Link>}
              {isSubscribed && <Link to="/favorites">Mes Favoris</Link>}
          <button onClick={() => navigate("/logout")}>Se déconnecter</button>
            </>
          ) : (
            <>
              <Link to="/">Accueil</Link>
              <Link to="/login">Se connecter</Link>
              <Link to="/signup">S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

