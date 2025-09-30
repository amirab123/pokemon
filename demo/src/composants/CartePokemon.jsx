import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store";
import "../css/CartePokemon.css";

export default function CartePokemon({ name, url }) {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const favorites = useSelector((state) => state.app.favorites);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const res = await fetch(url);
        const d = await res.json();
        if (mounted) setData(d);
      } catch (err) {
        console.error("Erreur lors du chargement du Pokémon :", err);
      }
    }
    fetchData();
    return () => (mounted = false);
  }, [url]);

  if (!data) return <div className="carte-pokemon">Chargement...</div>;

  const id = data.id;
  const sprite =
    data.sprites?.other?.["official-artwork"]?.front_default ||
    data.sprites.front_default;
  const isFav = favorites.some((f) => f.id === id);

  const toggleFav = () => {
    if (!user) {
      alert("Connectez-vous pour profiter de la fonctionnalité favoris.");
      return;
    }
    const item = { id, name, image: sprite };
    if (isFav) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <div className="carte-pokemon">
      <Link to={`/pokemon/${id}`}>
        <img src={sprite} alt={name} />
        <h3>{name}</h3>
      </Link>
      <div className="actions">
        <Link to={`/pokemon/${id}`} className="details-link">
          Détails
        </Link>
        <button onClick={toggleFav} className={`btn-fav ${isFav ? "favori" : ""}`}>
          {isFav ? "Supprimer des favoris" : "Ajouter aux favoris"}
        </button>
      </div>
    </div>
  );
}
