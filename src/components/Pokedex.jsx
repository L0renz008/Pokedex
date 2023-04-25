import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";
import PokemonTile from "./PokemonTile";

export default function Pokedex() {
  const [listOfPoke, setListOfPoke] = useState([]);
  const [pokedexSize, setPokedexSize] = useState();
  const [loading, setLoading] = useState(true);

  const [onePoke, setOnePoke] = useState();

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
    setListOfPoke(list);
    setLoading(false);
  }
  async function getOnePokemon(id) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${id - 1}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await res.json();
    const [onePokemon] = data.results;
    setOnePoke(onePokemon);
  }
  // console.log("getOnePoke", onePoke);
  // console.log("list", listOfPoke[9]);
  // async function getArtwork(url) {
  //   const res = await fetch(`${url}`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const data = await res.json();
  //   // console.log(data);
  //   const artwork = data.sprites.other["official-artwork"].front_default;
  //   console.log(artwork);
  //   return artwork;
  // }

  useEffect(() => {
    getListOfPokemons(1);
    // getOnePokemon(2);
  }, []);
  const handleChange = (event) => {
    // const [tileToDisplay] = document.getElementsByClassName(event.target.value);
    // const tileToHide = document.getElementsByClassName("pokemon-tile");
    // const tileToDisplay = document.getElementById(event.target.value);
    // console.log(tileToHide);
    // for (let i = 0; i <= tileToHide.length; i++) {
    //   console.log(tileToHide[i]);
    //   tileToDisplay.style.display = "";
    //   tileToHide[i].style.display = "none";
    // }
    getOnePokemon(event.target.value);

    // if (tileToDisplay) {
    //   tileToDisplay.style.display = "none";
    //   console.log(tileToDisplay.style.display);
    // }
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className="title">Pokédex</div>
      <input type="text" onChange={handleChange} />
      {onePoke ? <PokemonTile poke={onePoke} /> : null}
      <InfiniteScroll
        pageStart={0}
        loadMore={getListOfPokemons}
        hasMore={listOfPoke.length !== pokedexSize}
        // loader={<div>Loading...</div>}
        className="pokedex-body"
      >
        {listOfPoke.map((poke, index) => {
          // console.log(poke);
          return (
            <PokemonTile key={index} poke={poke} />
            // <a
            //   key={poke.name}
            //   href={`${poke.url.split("https://pokeapi.co/api/v2/pokemon").pop()}`}
            // >
            //   <span className="pokemon-id">#9999</span>
            //   <img src={getArtwork(poke.url)}></img>
            //   <li>{poke.name}</li>
            // </a>
          );
        })}
      </InfiniteScroll>

      {/* {listOfPoke.map((poke) => (
        <a key={poke.name} href={`${poke.url.split("https://pokeapi.co/api/v2/pokemon").pop()}`}>
          <li>{poke.name}</li>
        </a>
      ))} */}
    </>
  );
}
