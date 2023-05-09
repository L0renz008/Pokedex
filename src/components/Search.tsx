import { useEffect, useState } from "react";

import PokemonTile from "./PokemonTile";

interface ISearchPoke {
  name: string;
  url: string;
}

export default function Search() {
  const [searchPokemon, setSearchPokemon] = useState<ISearchPoke>();
  const [id, setId] = useState(0);
  /**
   * Function that calls PokeAPI to get just one Pokemon specified by the `id`
   *
   */
  async function getOnePokemon() {
    console.log(id);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${id - 1}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await res.json();
    setSearchPokemon(data.results[0]);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      getOnePokemon();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);
  return (
    <div>
      <input
        type="number"
        pattern="[0-9]*"
        onChange={(e) => setId(e.target.valueAsNumber)}
      />
      {searchPokemon && !Number.isNaN(id) ? (
        <PokemonTile poke={searchPokemon} />
      ) : null}
    </div>
  );
}
