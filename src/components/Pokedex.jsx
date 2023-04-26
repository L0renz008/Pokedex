import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";
import PokemonTile from "./PokemonTile";

/**
 * Component that shows all the Pokemon tiles with infinite scroll
 *
 */
export default function Pokedex() {
  const [listOfPokemon, setlistOfPokemon] = useState([]);
  const [pokedexSize, setPokedexSize] = useState();
  const [loading, setLoading] = useState(true);

  const [searchPokemon, setSearchPokemon] = useState();

  /**
   * Function that calls PokeAPI to get all the Pokemon available
   * @param {int} page
   */
  async function getListOfPokemons(page) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${page * 10}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    const list = data.results;

    setPokedexSize(data.count);
    setlistOfPokemon(list);
    setLoading(false);
  }
  /**
   * Function that calls PokeAPI to get just one Pokemon specified by the `id`
   * @param {int} id
   */
  async function getOnePokemon(id) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${id - 1}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await res.json();
    setSearchPokemon(data.results[0]);
  }

  /**
   * Function that handle the input in order to get the Pokemon a user searches
   * @param {*} event
   */
  const handleChange = (event) => {
    getOnePokemon(event.target.value);
  };

  useEffect(() => {
    getListOfPokemons(1);
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      <header>
        <div className="title">Pokédex</div>
      </header>

      <input type="text" onChange={handleChange} />
      {searchPokemon ? <PokemonTile poke={searchPokemon} /> : null}
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
