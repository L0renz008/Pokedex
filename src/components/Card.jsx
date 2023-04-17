import React, { useEffect, useState } from "react";
import { Routes, Route, useSearchParams, BrowserRouter, redirect } from "react-router-dom";
import chevronRight from "../assets/chevron_right.svg";
import chevronLeft from "../assets/chevron_left.svg";
import pokeball from "../assets/pokeball.svg";
import weight from "../assets/weight.svg";
import height from "../assets/height.svg";
import arrow_left from "../assets/arrow_left.svg";
import Loading from "./Loading";

export default function Card() {
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryParameters = new URLSearchParams(window.location.search);
  const [currentPoke, setCurrentPoke] = useState(
    `https://pokeapi.co/api/v2/pokemon/${parseInt(queryParameters.get("id"))}`
  );

  async function getPokemonData() {
    const res = await fetch(currentPoke, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    const poke = {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      height: data.height,
      weight: data.weight,
      abilities: [
        ...new Set(
          data.abilities.map(
            (ability) =>
              ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)
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
        (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
      ),
    };
    setPoke(poke);
    setLoading(false);
  }
  useEffect(() => {
    getPokemonData();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className={`card-container ${poke?.types[0].toLowerCase()}`}>
      <div className="pokeball">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="title">
        <img src={arrow_left} alt="Retour" className="arrow left" onClick={getPokemonData} />
        <h1>{poke?.name}</h1>
        <span>#{poke?.id.toString().padStart(4, "0")}</span>
      </div>
      <div className="image">
        <a href={`?id=${poke?.id - 1}`}>
          <img src={chevronLeft} alt="chevron-left" className="chevron left" />
        </a>
        <img
          // src="../img/bulbasaur.png"
          src={
            queryParameters.get("shiny") === "true" ? poke?.artwork.shiny : poke?.artwork.official
          }
          alt={`${poke?.name}.png`}
          className="pokemon-img"
        />
        <a href={`?id=${poke?.id + 1}`}>
          <img src={chevronRight} alt="chevron-right" className="chevron right" />
        </a>
      </div>
      <div className="card-info">
        <div className="type-container">
          {poke
            ? poke.types.map((type) => (
                <h2 className={`type ${type.toLowerCase()}`} key={type}>
                  {type}
                </h2>
              ))
            : null}
        </div>
        <div className={`about ${poke?.types[0].toLowerCase()}`}>
          <h2>About</h2>
        </div>
        <div className="attributes">
          <div className="weight">
            <div className="weight-info">
              <img src={weight} alt="weight" className="img_weight" />
              <span>{poke?.weight / 10} kg</span>
            </div>
            <span>Weight</span>
          </div>
          <div className="height">
            <div className="height-info">
              <img src={height} alt="height" className="img_height" />
              <span>{poke?.height / 10} m</span>
            </div>
            <span>Height</span>
          </div>
          <div className="abilities">
            <div className="abilities-info">
              {poke?.abilities.map((ability) => (
                <span key={ability}>{ability}</span>
              ))}
            </div>
            <span>Abilities</span>
          </div>
        </div>
        <div className="description">
          <p>
            There is a plant seed on its back right from the day this Pokémon is born. The seed
            slowly grows larger.
          </p>
        </div>
        <div className={`base-stats ${poke?.types[0].toLowerCase()}`}>
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
              <p>{poke?.stats.hp}</p>
              <p>{poke?.stats.attack}</p>
              <p>{poke?.stats.defense}</p>
              <p>{poke?.stats.spattack}</p>
              <p>{poke?.stats.spdefense}</p>
              <p>{poke?.stats.speed}</p>
            </div>
            <div className="chart">
              <div
                className={`stat hp ${poke?.types[0].toLowerCase()}`}
                style={{ width: `${(poke?.stats.hp * 100) / 255}%` }}
              ></div>
              <div
                className={`stat attack ${poke?.types[0].toLowerCase()}`}
                style={{ width: `${(poke?.stats.attack * 100) / 255}%` }}
              ></div>
              <div
                className={`stat defense ${poke?.types[0].toLowerCase()}`}
                style={{ width: `${(poke?.stats.defense * 100) / 255}%` }}
              ></div>
              <div
                className={`stat spe-attack ${poke?.types[0].toLowerCase()}`}
                style={{ width: `${(poke?.stats.spattack * 100) / 255}%` }}
              ></div>
              <div
                className={`stat spe-defense ${poke?.types[0].toLowerCase()}`}
                style={{ width: `${(poke?.stats.spdefense * 100) / 255}%` }}
              ></div>
              <div
                className={`stat speed ${poke?.types[0].toLowerCase()}`}
                style={{ width: `${(poke?.stats.speed * 100) / 255}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
