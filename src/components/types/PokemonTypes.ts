export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<string>;
  artwork: { official: string; home: string; shiny: string };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spattack: number;
    spdefense: number;
    speed: number;
  };
  types: Array<string>;
}
export interface IPokeData {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<IAbility>;
  sprites: {
    other: {
      home: { front_default: string; front_shiny: string };
      "official-artwork": { front_default: string; front_shiny: string };
    };
  };
  stats: Array<IStat>;
  types: Array<IType>;
}
export interface IAbility {
  ability: { name: string };
}
export interface IStat {
  base_stat: number;
}
export interface IType {
  type: {
    name: string;
  };
}
