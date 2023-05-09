import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";
import PokemonTile from "./PokemonTile";
import Search from "./Search";

import axios from "axios";

/**
 * Component that shows all the Pokemon tiles with infinite scroll
 */
export default function Pokedex() {
  const [listOfPokemon, setlistOfPokemon] = useState([]);
  const [pokedexSize, setPokedexSize] = useState();
  const [loading, setLoading] = useState(true);

  /**
   * Function that calls PokeAPI to get all the Pokemon available
   * @param {number} page
   */
  async function getListOfPokemons(page: number) {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${page * 10}`
    );
    const data = res.data;
    const list = data.results;

    setPokedexSize(data.count);
    setlistOfPokemon(list);
    setLoading(false);
  }

  useEffect(() => {
    getListOfPokemons(1);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <header>
        <div className="title">
          <h1>Pokédex</h1>
        </div>
      </header>
      <Search />
      <InfiniteScroll
        pageStart={0}
        loadMore={getListOfPokemons}
        hasMore={listOfPokemon.length !== pokedexSize}
        className="pokedex-body"
      >
        {listOfPokemon.map((poke, index) => {
          return <PokemonTile key={index} poke={poke} />;
        })}
      </InfiniteScroll>
    </>
  );
}
