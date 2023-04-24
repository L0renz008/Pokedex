import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";

export default function Pokedex() {
  const [listOfPoke, setListOfPoke] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getListOfPokemons(page = 1) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page * 1}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const list = data.results;
    // console.log(list);
    setListOfPoke(list);
    setLoading(false);
  }
  // console.log(listOfPoke[0].url.split("https://pokeapi.co/api/v2/pokemon").pop());
  useEffect(() => {
    getListOfPokemons(1);
  }, []);
  const items = listOfPoke.map((poke) => {
    return <li>{poke.name}</li>;
  });
  // console.log(items);
  if (loading) return <Loading />;
  return (
    <>
      <div>Pokédex</div>
      {/* <div style={{ height: "700px;overflow:auto;" }}> */}
        <InfiniteScroll
          pageStart={1}
          loadMore={getListOfPokemons}
          hasMore={true}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {items}
        </InfiniteScroll>
      {/* </div> */}

      {listOfPoke.map((poke) => (
        <a key={poke.name} href={`${poke.url.split("https://pokeapi.co/api/v2/pokemon").pop()}`}>
          <li>{poke.name}</li>
        </a>
      ))}
    </>
  );
}
