import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setFavorites, removeFavorite } from "../store";
import "../css/Favorite.css";

export default function Favorite() {
  const { user, isSubscribed, favorites } = useSelector((state) => state.app);
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (user?.uid && favorites.length === 0) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];
      dispatch(setFavorites(storedFavorites));
    }
  }, [dispatch, user?.uid, favorites.length]);

  const handleRemoveFavorite = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce favori ?")) {
      dispatch(removeFavorite(id));
      alert("Favori supprimé !");
    }
  };

  const handleClearFavorites = () => {
    if (window.confirm("Voulez-vous vraiment supprimer tous vos favoris ?")) {
      dispatch(setFavorites([]));
      alert("Tous les favoris ont été supprimés !");
    }
  };

  if (!user) return <Navigate to="/login" />;
  if (!isSubscribed)
    return <p className="warning">⚠️ Vous devez être abonné pour accéder à vos favoris.</p>;

  return (
    <div className="favorites-container">
      <h2>Bienvenue, {user?.displayName || "Utilisateur"} !</h2>
      <h3>Mes Favoris</h3>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>Aucun favori pour le moment.</p>
        </div>
      ) : (
        <>
          <button className="btn supprimer all" onClick={handleClearFavorites}>
            Supprimer tous les favoris
          </button>

          <div className="favorites-grid fade-in">
            {favorites.map((item) => (
              <div key={item.id} className="favorite-card">
                <img
                  src={item.image || "/assets/default-pokemon.png"}
                  alt={item.name}
                  className="favorite-img"
                />
                <h4>{item.name}</h4>
                <button onClick={() => handleRemoveFavorite(item.id)} className="btn supprimer">
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
