import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./Loading";
import PokemonTile from "./PokemonTile";
import Search from "./Search";
import Filters from "./Filters";

// import gen1 from "../assets/gen1.png";
// import gen2 from "../assets/gen2.png";
// import gen3 from "../assets/gen3.png";
// import gen4 from "../assets/gen4.png";
// import gen5 from "../assets/gen5.png";
// import gen6 from "../assets/gen6.png";
// import gen7 from "../assets/gen7.png";
// import gen8 from "../assets/gen8.png";
// import gen9 from "../assets/gen9.png";

import axios from "axios";

interface IListOfPoke {
  name: string;
  url: string;
}

/**
 * Component that shows all the Pokemon tiles with infinite scroll
 */
export default function Pokedex() {
  const [listOfPokemon, setlistOfPokemon] = useState<IListOfPoke[]>();
  const [pokedexSize, setPokedexSize] = useState(0);
  const [loading, setLoading] = useState(true);

  const OFFSET_GEN1 = 0;
  const OFFSET_GEN2 = 151;
  const OFFSET_GEN3 = 251;
  const OFFSET_GEN4 = 386;
  const OFFSET_GEN5 = 494;
  const OFFSET_GEN6 = 649;
  const OFFSET_GEN7 = 721;
  const OFFSET_GEN8 = 809;
  const OFFSET_GEN9 = 905;

  const filterPerGen = (gen: number): boolean => {
    // console.log(gen);
    return gen == 1;
  };

  const FILTERS = [
    <Filters gen={1} active={true} filter={filterPerGen} />,
    <Filters gen={2} active={true} filter={filterPerGen} />,
    <Filters gen={3} active={true} filter={filterPerGen} />,
    <Filters gen={4} active={true} filter={filterPerGen} />,
    <Filters gen={5} active={true} filter={filterPerGen} />,
    <Filters gen={6} active={true} filter={filterPerGen} />,
    <Filters gen={7} active={true} filter={filterPerGen} />,
    <Filters gen={8} active={true} filter={filterPerGen} />,
    <Filters gen={9} active={true} filter={filterPerGen} />,
  ];

  /**
   * Function that calls PokeAPI to get all the Pokemon available
   * @param {number} page
   */
  async function getListOfPokemons(page: number) {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${page * 20}`
    );
    const data = res.data;
    const list = data.results;

    setPokedexSize(data.count);
    setlistOfPokemon(list);
    setLoading(false);
  }
  let navigate = useNavigate();
  async function getPokeAlea() {
    const id = Math.round(Math.random() * 1010 + 1);

    navigate(`/pokemon/${id}`);
  }
  useEffect(() => {
    getListOfPokemons(1);
  }, []);

  const [gen1Checked, setGen1Checked] = useState(true);
  const [gen2Checked, setGen2Checked] = useState(true);
  const [gen3Checked, setGen3Checked] = useState(true);
  const [gen4Checked, setGen4Checked] = useState(true);
  const [gen5Checked, setGen5Checked] = useState(true);
  const [gen6Checked, setGen6Checked] = useState(true);
  const [gen7Checked, setGen7Checked] = useState(true);
  const [gen8Checked, setGen8Checked] = useState(true);
  const [gen9Checked, setGen9Checked] = useState(true);

  if (loading) return <Loading />;

  return (
    <>
      <header>
        <div className="title">
          <h1>Pokedex</h1>
          <button onClick={getPokeAlea}>Get alea</button>
        </div>
      </header>
      <Search />
      {/* <Filters active={true} /> */}
      <div className="filters">
        {FILTERS.map((filter) => {
          return filter;
        })}
      </div>
      <div className="filters">
        <input
          type="checkbox"
          id="gen1"
          className="filter-gen1"
          onChange={() => setGen1Checked(!gen1Checked)}
          checked={gen1Checked}
        />
        <input
          type="checkbox"
          id="gen2"
          className="filter-gen2"
          onChange={() => setGen2Checked(!gen2Checked)}
          checked={gen2Checked}
        />
        <input
          type="checkbox"
          id="gen3"
          className="filter-gen3"
          onChange={() => setGen3Checked(!gen3Checked)}
          checked={gen3Checked}
        />
        <input
          type="checkbox"
          id="gen4"
          className="filter-gen4"
          onChange={() => setGen4Checked(!gen4Checked)}
          checked={gen4Checked}
        />
        <input
          type="checkbox"
          id="gen5"
          className="filter-gen5"
          onChange={() => setGen5Checked(!gen5Checked)}
          checked={gen5Checked}
        />
        <input
          type="checkbox"
          id="gen6"
          className="filter-gen6"
          onChange={() => setGen6Checked(!gen6Checked)}
          checked={gen6Checked}
        />
        <input
          type="checkbox"
          id="gen7"
          className="filter-gen7"
          onChange={() => setGen7Checked(!gen7Checked)}
          checked={gen7Checked}
        />
        <input
          type="checkbox"
          id="gen8"
          className="filter-gen8"
          onChange={() => setGen8Checked(!gen8Checked)}
          checked={gen8Checked}
        />
        <input
          type="checkbox"
          id="gen9"
          className="filter-gen9"
          onChange={() => setGen9Checked(!gen9Checked)}
          checked={gen9Checked}
        />

        {/* <img src={gen1}></img>
        <img src={gen2}></img>
        <img src={gen3}></img>
        <img src={gen4}></img>
        <img src={gen5}></img>
        <img src={gen6}></img>
        <img src={gen7}></img>
        <img src={gen8}></img>
        <img src={gen9}></img> */}
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={getListOfPokemons}
        hasMore={listOfPokemon?.length !== pokedexSize}
        className="pokedex-body"
      >
        {listOfPokemon?.map((poke, index) => {
          return (
            <PokemonTile
              key={index}
              name={poke.name}
              url={poke.url}
              hidden={
                (gen1Checked &&
                  index + 1 > OFFSET_GEN1 &&
                  index + 1 < OFFSET_GEN2) ||
                (gen2Checked &&
                  index + 1 > OFFSET_GEN2 &&
                  index + 1 < OFFSET_GEN3) ||
                (gen3Checked &&
                  index + 1 > OFFSET_GEN3 &&
                  index + 1 < OFFSET_GEN4) ||
                (gen4Checked &&
                  index + 1 > OFFSET_GEN4 &&
                  index + 1 < OFFSET_GEN5) ||
                (gen5Checked &&
                  index + 1 > OFFSET_GEN5 &&
                  index + 1 < OFFSET_GEN6) ||
                (gen6Checked &&
                  index + 1 > OFFSET_GEN6 &&
                  index + 1 < OFFSET_GEN7) ||
                (gen7Checked &&
                  index + 1 > OFFSET_GEN7 &&
                  index + 1 < OFFSET_GEN8) ||
                (gen8Checked &&
                  index + 1 > OFFSET_GEN8 &&
                  index + 1 < OFFSET_GEN9) ||
                (gen9Checked && index + 1 > OFFSET_GEN9)
                  ? ""
                  : "hidden"
              }
            />
          );
        })}
      </InfiniteScroll>
    </>
  );
}
