import React from "react";
import chevronRight from "../assets/chevron_right.svg";
import chevronLeft from "../assets/chevron_left.svg";
import pokeball from "../assets/pokeball.svg";

export default function Card() {
  return (
    <div className="card-container">
      <div className="pokeball">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="title">
        <p>Retour</p>
        <h1>Bulbasaur</h1>
        <p>#001</p>
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
          <p>weigth</p>
          <p>heigth</p>
          <p>moves</p>
        </div>
        <div className="description">
          <p>
            There is a plant seed on its back right from the day this Pokémon is
            born. The seed slowly grows larger.
          </p>
        </div>
        <div className="base-stats">
          <h2>Base Stats</h2>
        </div>
      </div>
    </div>
  );
}
