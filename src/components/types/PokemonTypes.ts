export type TPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<string>;
  artwork: TArtwork;
  stats: TStats;
  types: Array<string>;
  url?: string;
};
type TArtwork = {
  official: string;
  home: string;
  shiny: string;
};
type TStats = {
  hp: number;
  attack: number;
  defense: number;
  spattack: number;
  spdefense: number;
  speed: number;
};
export type TPokemonAPI = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Array<TAbility>;
  sprites: {
    other: {
      home: { front_default: string; front_shiny: string };
      "official-artwork": { front_default: string; front_shiny: string };
    };
  };
  stats: Array<TStatsAPI>;
  types: Array<TType>;
};

type TAbility = {
  ability: { name: string };
};
type TType = {
  type: {
    name: string;
  };
};
type TStatsAPI = { base_stat: number };
