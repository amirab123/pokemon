import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Detail.css";

export default function Detail(){
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function fetchPokemon(){
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) {
        setPokemon(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPokemon(data);
      setLoading(false);
    }
    fetchPokemon();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!pokemon) return <p>Pokémon introuvable.</p>;

  return (
    <div className="detail-container">
      <h1>{pokemon.name} (#{pokemon.id})</h1>
      <div className="detail-content">
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
        <div className="detail-info">
          <p><strong>Types:</strong> {pokemon.types.map(t=>t.type.name).join(", ")}</p>
          <p><strong>Taille:</strong> {pokemon.height}</p>
          <p><strong>Poids:</strong> {pokemon.weight}</p>
          <p><strong>Stats:</strong></p>
          <ul>
            {pokemon.stats.map(s => <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>)}
          </ul>
          
        </div>
      </div>
      
          
    </div>
       
  
  );
}
