import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface IPokeProps {
  name: string;
  url: string;
  hidden?: string;
}

/**
 * Component for showing mini tiles of Pokemon.
 *
 * @component
 */
export default function PokemonTile({ name, url, hidden }: IPokeProps) {
  const [id, setId] = useState(0);
  const [artwork, setArtwork] = useState("");

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const handleImgLoad = () => {
    setIsImgLoaded(true);
  };

  /**
   * Function called to get the image of the Pokemon
   * @function
   */
  async function getArtwork() {
    const res = await fetch(`${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setArtwork(data.sprites.other["official-artwork"].front_default);
    setId(data.id);
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
