import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../store";
import "../css/AddFavorite.css";

export default function AddFavorite() {
  const { user, isSubscribed, favorites } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!user) return navigate("/login");
  if (!isSubscribed) return <p>⚠️ Vous devez être abonné pour ajouter des favoris.</p>;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await res.json();
        setPokemons(data.results);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les Pokémon.");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const handleAddFavorite = (pokemon) => {
    const exists = favorites.find((p) => p.name === pokemon.name);
    if (!exists) {
      dispatch(addFavorite({
        ...pokemon,
        id: pokemon.name,
        image: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`,
      }));
    }
  };

  if (loading) return <p className="loader">Chargement…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="add-favorite-container">
      <h2>Ajouter un Pokémon à vos favoris</h2>
      <div className="pokemon-grid">
        {pokemons.map((p) => {
          const isFavorite = favorites.find((f) => f.name === p.name);
          return (
            <div key={p.name} className="pokemon-card">
              <img
                src={`https://img.pokemondb.net/artwork/${p.name}.jpg`}
                alt={p.name}
                style={{ width: "120px", height: "120px", objectFit: "contain" }}
              />
              <h4>{p.name}</h4>
              <button
                onClick={() => handleAddFavorite(p)}
                className={`btn add ${isFavorite ? "added" : ""}`}
                disabled={isFavorite}
              >
                {isFavorite ? "Déjà favori" : "Ajouter aux favoris"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
