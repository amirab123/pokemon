import  { useEffect, useState } from "react";
import CartePokemon from "../composants/CartePokemon"; 
import "../css/Accueil.css";
import Pikachu from "../assets/pokemon-pictures-8zk4zk2ni8sq48yg.jpg";
import pikachu1 from "../assets/upmtCfm.jpg";
import Pikachu2 from "../assets/4vux77ou.jpg";
import Pikachu3 from "../assets/z90YOyS.jpg";
import Pikachu4 from "../assets/pokemon-hd-ash-and-pikachu-facgnm23muocccf0.jpg";
export default function Accueil() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await res.json();
        setPokemons(data.results); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  if (loading) return <div className="accueil-container">Chargement...</div>;

  return (
    <div className="accueil-container">
      <h1>Pokémons</h1>
   
 <div className="slider-container">
        <div className="slider-track">
          <img src={Pikachu} alt="slider" />
          <img src={pikachu1} alt="slider" />
          <img src={Pikachu4} alt="slider" />
          <img src={Pikachu2} alt="slider" />
             <img src={Pikachu3} alt="slider" />
        </div>
      </div>
      
      <div className="pokemon-grid">
        {pokemons.map((p) => (
          <CartePokemon key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    </div>
    
  );
}
