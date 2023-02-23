import React from "react";
import chevronRight from "../assets/chevron_right.svg";
import chevronLeft from "../assets/chevron_left.svg";
import pokeball from "../assets/pokeball.svg";
import weight from "../assets/weight.svg";
import height from "../assets/height.svg";
import arrow_left from "../assets/arrow_left.svg";

export default function Card() {
  return (
    <div className="card-container">
      <div className="pokeball">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="title">
        <img src={arrow_left} alt="Retour" className="arrow left" />
        <h1>Bulbasaur</h1>
        <span>#001</span>
      </div>
      <div className="image">
        <img src={chevronLeft} alt="chevron-left" className="chevron left" />
        <img
          src="../img/bulbasaur.png"
          alt="bulbasaur.png"
          className="pokemon-img"
        />
        <img src={chevronRight} alt="chevron-right" className="chevron right" />
      </div>
      <div className="card-info">
        <div className="type-container">
          <h2 className="type grass">Grass</h2>
          <h2 className="type poison">Poison</h2>
        </div>
        <div className="about">
          <h2>About</h2>
        </div>
        <div className="attributes">
          <div className="weight">
            <div className="weight-info">
              <img src={weight} alt="weight" className="img_weight" />
              <span>6,9 kg</span>
            </div>
            <span>Weight</span>
          </div>
          <div className="height">
            <div className="height-info">
              <img src={height} alt="height" className="img_height" />
              <span>0,7 m</span>
            </div>
            <span>Height</span>
          </div>
          <div className="abilities">
            <div className="abilities-info">
              <span>Chlorophyll</span>
              <span>Overgrow</span>
            </div>
            <span>Abilities</span>
          </div>
        </div>
        <div className="description">
          <p>
            There is a plant seed on its back right from the day this Pokémon is
            born. The seed slowly grows larger.
          </p>
        </div>
        <div className="base-stats">
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
              <p>45</p>
              <p>49</p>
              <p>49</p>
              <p>65</p>
              <p>65</p>
              <p>45</p>
            </div>
            <div className="chart">
              <div
                className="stat hp"
                style={{ width: `${(45 * 100) / 200}%` }}
              ></div>
              <div
                className="stat attack"
                style={{ width: `${(49 * 100) / 200}%` }}
              ></div>
              <div
                className="stat defense"
                style={{ width: `${(49 * 100) / 200}%` }}
              ></div>
              <div
                className="stat spe-attack"
                style={{ width: `${(65 * 100) / 200}%` }}
              ></div>
              <div
                className="stat spe-defense"
                style={{ width: `${(65 * 100) / 200}%` }}
              ></div>
              <div
                className="stat speed"
                style={{ width: `${(45 * 100) / 200}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
