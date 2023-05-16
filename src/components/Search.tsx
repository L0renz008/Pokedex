import { useEffect, useState } from "react";

import PokemonTile from "./PokemonTile";
import Loading from "./Loading";

interface ISearchPoke {
  name: string;
  url: string;
}

export default function Search() {
  const [searchPokemon, setSearchPokemon] = useState<ISearchPoke>();
  const [id, setId] = useState(0);
  const [isTileLoading, setIsTileLoading] = useState(false);

  /**
   * Function that calls PokeAPI to get just one Pokemon specified by the `id`
   *
   */
  async function getOnePokemon() {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${id - 1}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await res.json();
    setSearchPokemon(data.results[0]);
    setIsTileLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      getOnePokemon();
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        margin: "5px",
      }}
    >
      <input
        type="number"
        pattern="[0-9]*"
        onChange={(e) => {
          setId(e.target.valueAsNumber);
          setIsTileLoading(true);
        }}
        style={{ width: "20%" }}
      />
      {isTileLoading ? (
        <Loading />
      ) : searchPokemon && !Number.isNaN(id) ? (
        <PokemonTile name={searchPokemon.name} url={searchPokemon.url} />
      ) : null}
    </div>
  );
}
