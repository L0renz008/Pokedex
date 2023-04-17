import React from "react";
import pokeball_color from "../assets/pokeball_color.svg";

export default function Loading() {
  return (
    <div>
      <img className="loading_pokeball" src={pokeball_color} alt="pokeball_color" />
    </div>
  );
}
