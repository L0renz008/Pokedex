import pokeball_color from "../assets/pokeball_color.svg";

/**
 * Component that displays the loading pokeball
 */
export default function Loading() {
  return (
    <figure>
      <img
        className="loading_pokeball"
        src={pokeball_color}
        alt="pokeball_color"
      />
    </figure>
  );
}
