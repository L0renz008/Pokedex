import { Routes, Route, BrowserRouter } from "react-router-dom";

import Card from "./components/Card";
import Pokedex from "./components/Pokedex";
import NoMatch from "./components/NoMatch";

/**
 * Component that renders the app entirely with routing
 *
 */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Pokedex />} />
          <Route path={`/pokemon/:id`} element={<Card />} />
          <Route path={`*`} element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
