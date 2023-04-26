import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import chevronRight from "../assets/chevron_right.svg";
import chevronLeft from "../assets/chevron_left.svg";
import pokeball from "../assets/pokeball.svg";
import weight from "../assets/weight.svg";
import height from "../assets/height.svg";
import arrow_left from "../assets/arrow_left.svg";

import Loading from "./Loading";

/**
 * Component that displays the Card with all the Pokemon's infos
 *
 */
export default function Card() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlParams = useParams();
  const id = urlParams.id;

  /**
   * Function that calls PokeAPI to get all Pokemon's infos
   */
  async function getPokemonData() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    const pokemon = {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      height: data.height,
      weight: data.weight,
      abilities: [
        ...new Set(
          data.abilities.map(
            (ability) =>
              ability.ability.name.charAt(0).toUpperCase() +
              ability.ability.name.slice(1)
          )
        ),
      ],
      artwork: {
        official: data.sprites.other["official-artwork"].front_default,
        home: data.sprites.other["home"].front_default,
        shiny: data.sprites.other["official-artwork"].front_shiny,
      },
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        spattack: data.stats[3].base_stat,
        spdefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
      types: data.types.map(
        (type) =>
          type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
      ),
    };
    setPokemon(pokemon);
    setLoading(false);
  }

  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className={`card-container ${pokemon?.types[0].toLowerCase()}`}>
      <div className="pokeball">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="title">
        <a href="/">
          <img
            src={arrow_left}
            alt="Retour"
            className="arrow_left"
            onClick={getPokemonData}
          />
        </a>
        <h1>{pokemon?.name}</h1>
        <span>#{pokemon?.id.toString().padStart(4, "0")}</span>
      </div>
      <div className="image">
        <a
          href={`/pokemon/${pokemon?.id - 1}`}
          style={
            pokemon?.id === 1 ? { opacity: "0", pointerEvents: "none" } : null
          }
        >
          <img src={chevronLeft} alt="chevron-left" className="chevron left" />
        </a>
        <img
          src={pokemon?.artwork.official}
          alt={`${pokemon?.name}.png`}
          onLoad={handleImgLoad}
          style={{ display: "none" }}
        />

        {imgLoaded ? (
          <img
            src={pokemon?.artwork.official}
            alt={`${pokemon?.name}.png`}
            className="pokemon-img"
          />
        ) : (
          <Loading />
        )}

        <a href={`/pokemon/${pokemon?.id + 1}`}>
          <img
            src={chevronRight}
            alt="chevron-right"
            className="chevron right"
            style={
              pokemon?.id === 1010
                ? { opacity: "0", pointerEvents: "none" }
                : null
            }
          />
        </a>
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
              <span>{pokemon?.weight / 10} kg</span>
            </div>
            <span>Weight</span>
          </div>
          <div className="height">
            <div className="height-info">
              <img src={height} alt="height" className="img_height" />
              <span>{pokemon?.height / 10} m</span>
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
            There is a plant seed on its back right from the day this Pokémon is
            born. The seed slowly grows larger.
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
                  width: `${(pokemon?.stats.hp * 100) / 255}%`,
                }}
              >
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${(100 * 255) / pokemon?.stats.hp}%`,
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div
                className={`stat attack ${pokemon?.types[0].toLowerCase()}`}
                style={{ width: `${(pokemon?.stats.attack * 100) / 255}%` }}
              >
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${(100 * 255) / pokemon?.stats.attack}%`,
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div
                className={`stat defense ${pokemon?.types[0].toLowerCase()}`}
                style={{ width: `${(pokemon?.stats.defense * 100) / 255}%` }}
              >
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${(100 * 255) / pokemon?.stats.defense}%`,
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div
                className={`stat spe-attack ${pokemon?.types[0].toLowerCase()}`}
                style={{ width: `${(pokemon?.stats.spattack * 100) / 255}%` }}
              >
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${(100 * 255) / pokemon?.stats.spattack}%`,
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div
                className={`stat spe-defense ${pokemon?.types[0].toLowerCase()}`}
                style={{ width: `${(pokemon?.stats.spdefense * 100) / 255}%` }}
              >
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${(100 * 255) / pokemon?.stats.spdefense}%`,
                    opacity: "0.2",
                  }}
                ></div>
              </div>
              <div
                className={`stat speed ${pokemon?.types[0].toLowerCase()}`}
                style={{ width: `${(pokemon?.stats.speed * 100) / 255}%` }}
              >
                <div
                  className={`stat hp ${pokemon?.types[0].toLowerCase()}`}
                  style={{
                    width: `${(100 * 255) / pokemon?.stats.speed}%`,
                    opacity: "0.2",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
