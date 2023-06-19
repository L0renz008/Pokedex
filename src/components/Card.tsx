import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import chevronRight from "../assets/chevron_right.svg";
import chevronLeft from "../assets/chevron_left.svg";
import pokeball from "../assets/pokeball.svg";
import weight from "../assets/weight.svg";
import height from "../assets/height.svg";
import arrow_left from "../assets/arrow_left.svg";

import Loading from "./Loading";
import LoadingCard from "./LoadingCard";

import { TPokemon } from "./types/PokemonTypes";
import { TPokemonAPI } from "./types/PokemonTypes";
import GetPokemonAlea from "./GetPokemonAlea";

/**
 * Component that displays the Card with all the Pokemon's infos
 */
export default function Card() {
  const [pokemon, setPokemon] = useState<TPokemon>();
  const [loading, setLoading] = useState(true);

  const urlParams = useParams();
  const id = urlParams.id;

  /**
   * Function that calls PokeAPI to get all Pokemon's infos
   */
  async function getPokemonData() {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokeData: TPokemonAPI = await res.data;

      const pokemon: TPokemon = {
        id: pokeData.id,
        name:
          (pokeData.name as string).charAt(0).toUpperCase() +
          (pokeData.name as string).slice(1),
        height: pokeData.height,
        weight: pokeData.weight,
        abilities: [
          ...new Set(
            pokeData.abilities.map(
              (ability) =>
                ability.ability.name.charAt(0).toUpperCase() +
                ability.ability.name.slice(1)
            )
          ),
        ],
        artwork: {
          official: pokeData.sprites.other["official-artwork"].front_default,
          home: pokeData.sprites.other["home"].front_default,
          shiny: pokeData.sprites.other["official-artwork"].front_shiny,
        },
        stats: {
          hp: pokeData.stats[0].base_stat,
          attack: pokeData.stats[1].base_stat,
          defense: pokeData.stats[2].base_stat,
          spattack: pokeData.stats[3].base_stat,
          spdefense: pokeData.stats[4].base_stat,
          speed: pokeData.stats[5].base_stat,
        },
        types: pokeData.types.map(
          (type) =>
            type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
        ),
      };

      setPokemon(pokemon);
      setLoading(false);
    } catch (e: any) {
      if (e.response) {
        if (e.response.status === 404) {
          window.location.href = `/pokemon/not-found`;
          return;
        }
      }
      return;
    }
  }

  const [imgLoading, setImgLoading] = useState(true);
  const handleImgLoad = () => {
    setImgLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setImgLoading(true);
    getPokemonData();
  }, [id]);

  if (loading) return <LoadingCard />;
  return (
    <>
      <GetPokemonAlea type={pokemon?.types[0].toLowerCase()} />

      <div className={`card-container ${pokemon?.types[0].toLowerCase()}`}>
        <div className="pokeball">
          <img src={pokeball} alt="pokeball" />
        </div>
        <div className="title">
          <Link to="/">
            <img
              src={arrow_left}
              alt="Retour"
              className="arrow_left"
              onClick={getPokemonData}
            />
          </Link>
          <h1>{pokemon?.name}</h1>
          <span>#{pokemon?.id.toString().padStart(4, "0")}</span>
        </div>
        <div className="image">
          {pokemon?.id !== 1 ? (
            <Link to={pokemon ? `/pokemon/${pokemon?.id - 1}` : ""}>
              <img
                src={chevronLeft}
                alt="chevron-left"
                className="chevron left"
              />
            </Link>
          ) : (
            <div />
          )}
          <div style={{ display: imgLoading ? "block" : "none" }}>
            <Loading />
          </div>
          <div style={{ display: imgLoading ? "none" : "block" }}>
            {pokemon?.artwork.official ? (
              <img
                src={pokemon?.artwork.official}
                // alt={`${pokemon?.name}.png`}
                onLoad={() => {
                  handleImgLoad();
                  console.log(pokemon?.artwork);
                }}
                className="pokemon-img"
                // style={{ display: "none" }}
              />
            ) : (
              "No image"
            )}
          </div>

          {/* {imgLoading ? (
            <Loading />
          ) : (
            <img
              src={pokemon?.artwork.official}
              // alt={`${pokemon?.name}.png`}
              className="pokemon-img"
            />
          )} */}

          {pokemon?.id !== 1010 ? (
            <Link to={pokemon ? `/pokemon/${pokemon?.id + 1}` : ""}>
              <img
                src={chevronRight}
                alt="chevron-right"
                className="chevron right"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
        <div className="card-info">
          <div className="type-container">
            {pokemon
              ? pokemon.types.map((type) => (
                  <h2 className={`type ${type.toLowerCase()}`} key={type}>
                    {type}
                  </h2>
                ))
              : null}
          </div>
          <div className={`about ${pokemon?.types[0].toLowerCase()}`}>
            <h2>About</h2>
          </div>
          <div className="attributes">
            <div className="weight">
              <div className="weight-info">
                <img src={weight} alt="weight" className="img_weight" />
                <span>{pokemon ? pokemon.weight / 10 : null} kg</span>
              </div>
              <span>Weight</span>
            </div>
            <div className="height">
              <div className="height-info">
                <img src={height} alt="height" className="img_height" />
                <span>{pokemon ? pokemon.height / 10 : null} m</span>
              </div>
              <span>Height</span>
            </div>
            <div className="abilities">
              <div className="abilities-info">
                {pokemon?.abilities.map((ability) => (
                  <span key={ability}>{ability}</span>
                ))}
              </div>
              <span>Abilities</span>
            </div>
          </div>
          <div className="description">
            <div className="skeleton skeleton-text"></div>
            <p style={{ display: "none" }}>
              There is a plant seed on its back right from the day this Pokémon
              is born. The seed slowly grows larger.
            </p>
          </div>
          <div className={`base-stats ${pokemon?.types[0].toLowerCase()}`}>
            <h2>Base Stats</h2>
            <div className="base-stats-content">
              <div className="label">
                <p>HP</p>
                <p>ATK</p>
                <p>DEF</p>
                <p>SpATK</p>
                <p>SpDEF</p>
                <p>SPE</p>
              </div>
              <div className="value">
                <p>{pokemon?.stats.hp}</p>
                <p>{pokemon?.stats.attack}</p>
                <p>{pokemon?.stats.defense}</p>
                <p>{pokemon?.stats.spattack}</p>
                <p>{pokemon?.stats.spdefense}</p>
                <p>{pokemon?.stats.speed}</p>
              </div>
              <div className="chart">
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${pokemon ? (pokemon.stats.hp * 100) / 255 : 0}%`,
                  }}
                >
                  <div
                    className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                    style={{
                      width: `${pokemon ? (100 * 255) / pokemon.stats.hp : 0}%`,
                      opacity: "0.2",
                    }}
                  ></div>
                </div>
                <div
                  className={`stat attack ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${
                      pokemon ? (pokemon.stats.attack * 100) / 255 : 0
                    }%`,
                  }}
                >
                  <div
                    className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                    style={{
                      width: `${
                        pokemon ? (100 * 255) / pokemon.stats.attack : 0
                      }%`,
                      opacity: "0.2",
                    }}
                  ></div>
                </div>
                <div
                  className={`stat defense ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${
                      pokemon ? (pokemon.stats.defense * 100) / 255 : 0
                    }%`,
                  }}
                >
                  <div
                    className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                    style={{
                      width: `${
                        pokemon ? (100 * 255) / pokemon.stats.defense : 0
                      }%`,
                      opacity: "0.2",
                    }}
                  ></div>
                </div>
                <div
                  className={`stat spe-attack ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${
                      pokemon ? (pokemon.stats.spattack * 100) / 255 : 0
                    }%`,
                  }}
                >
                  <div
                    className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                    style={{
                      width: `${
                        pokemon ? (100 * 255) / pokemon?.stats.spattack : 0
                      }%`,
                      opacity: "0.2",
                    }}
                  ></div>
                </div>
                <div
                  className={`stat spe-defense ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${
                      pokemon ? (pokemon.stats.spdefense * 100) / 255 : 0
                    }%`,
                  }}
                >
                  <div
                    className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                    style={{
                      width: `${
                        pokemon ? (100 * 255) / pokemon?.stats.spdefense : 0
                      }%`,
                      opacity: "0.2",
                    }}
                  ></div>
                </div>
                <div
                  className={`stat speed ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${
                      pokemon ? (pokemon?.stats.speed * 100) / 255 : 0
                    }%`,
                  }}
                >
                  <div
                    className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                    style={{
                      width: `${
                        pokemon ? (100 * 255) / pokemon?.stats.speed : 0
                      }%`,
                      opacity: "0.2",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
