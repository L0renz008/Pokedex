import { Routes, Route, BrowserRouter } from "react-router-dom";

import Card from "./components/Card";
import Pokedex from "./components/Pokedex";
import NoMatch from "./components/NotFound";
import PokemonNotFound from "./components/PokemonNotFound";

/**
 * Component that renders the app entirely with routing
 */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Pokedex />} />
          <Route path={`/pokemon/:id`} element={<Card />} />
          <Route path={`/pokemon/not-found`} element={<PokemonNotFound />} />
          <Route path={`*`} element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
