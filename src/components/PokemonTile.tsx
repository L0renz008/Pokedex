import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface IPokeProps {
  name: string;
  url: string;
  hidden?: string;
}

const pokemonCache = new Map();

/**
 * Component for showing mini tiles of Pokemon.
 *
 * @component
 */
export default function PokemonTile({ name, url, hidden }: IPokeProps) {
  const [id, setId] = useState(0);
  const [artwork, setArtwork] = useState("");

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const handleImgLoad = useCallback(() => {
    setIsImgLoaded(true);
  }, []);

  /**
   * Function called to get the image of the Pokemon
   * @function
   */
  async function getArtwork() {
    if (pokemonCache.has(url)) {
      const cachedData = pokemonCache.get(url);
      setArtwork(cachedData.artwork);
      setId(cachedData.id);
    } else {
      try {
        const res = await fetch(`${url}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        const newArtwork = data.sprites.other["official-artwork"].front_default;
        const newId = data.id;
        setArtwork(newArtwork);
        setId(newId);

        pokemonCache.set(url, { artwork: newArtwork, id: newId });
      } catch (e) {
        console.log("Erreur lors de la récupération des données du Pokemon", e);
      }
    }
  }

  useEffect(() => {
    getArtwork();
  }, [name, url]);

  return (
    <Link
      className={`pokemon-tile ${hidden}`}
      id={`${id}`}
      to={`/pokemon/${id}`}
    >
      <span className="pokemon-id">#{id?.toString().padStart(4, "0")}</span>
      <img
        style={{ display: "none" }}
        src={artwork}
        onLoad={handleImgLoad}
      ></img>
      {isImgLoaded ? (
        <div style={{ position: "relative" }}>
          <img
            style={{
              height: "100px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -25%)",
              zIndex: "2",
            }}
            src={artwork}
          ></img>
        </div>
      ) : (
        <div className="custom-loader"></div>
      )}
      <span className="name">
        {name?.charAt(0).toUpperCase() + name?.slice(1)}
      </span>
    </Link>
  );
}
