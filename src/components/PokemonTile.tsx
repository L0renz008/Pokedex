import { useEffect, useState } from "react";

type PokeProps = {
  poke: { name: string; url: string };
};

/**
 * Component for showing mini tiles of Pokemon.
 *
 * @component
 */
export default function PokemonTile({ poke }: PokeProps) {
  const [id, setId] = useState(0);
  const [artwork, setArtwork] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImgLoad = () => {
    setIsLoaded(true);
  };

  /**
   * Function called to get the image of the Pokemon
   * @function
   */
  async function getArtwork() {
    const res = await fetch(`${poke.url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setArtwork(data.sprites.other["official-artwork"].front_default);
    setId(data.id);
  }

  useEffect(() => {
    getArtwork();
  }, [poke]);

  return (
    <a className={`pokemon-tile`} id={`${id}`} href={`/pokemon/${id}`}>
      <span className="pokemon-id">#{id?.toString().padStart(4, "0")}</span>
      <img
        style={{ display: "none" }}
        src={artwork}
        onLoad={handleImgLoad}
      ></img>
      {isLoaded ? (
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
      <li className="name">
        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
      </li>
    </a>
  );
}
