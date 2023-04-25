import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";

export default function PokemonTile({ poke }) {
  const [artwork, setArtwork] = useState();
  const [id, setId] = useState();
  const [isLoaded, setisLoaded] = useState(false);
  const handleImgLoad = () => {
    setisLoaded(true);
  };
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
  }, []);

  return (
    <a href={`${poke.url.split("https://pokeapi.co/api/v2/pokemon").pop()}`}>
      <span className="pokemon-id">#{id?.toString().padStart(4, "0")}</span>
      <img
        style={{ display: "none" }}
        src={artwork}
        onLoad={handleImgLoad}
      ></img>
      {isLoaded ? (
        <img style={{ height: "80px" }} src={artwork}></img>
      ) : (
        <div className="custom-loader"></div>
      )}

      <li>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</li>
    </a>
  );
}
