import { useNavigate } from "react-router-dom";

interface IGetPokemonAlea {
  type?: string | undefined;
}

export default function GetPokemonAlea({ type }: IGetPokemonAlea) {
  const navigate = useNavigate();
  function getPokeAlea() {
    const id = Math.round(Math.random() * 1010 + 1);
    navigate(`/pokemon/${id}`);
  }
  return (
    <button className={type} onClick={getPokeAlea}>
      Get Random Pokemon
    </button>
  );
}
