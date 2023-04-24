import { useState } from "react";

import { Routes, Route, useSearchParams, BrowserRouter } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import Card from "./components/Card";
import Pokedex from "./components/Pokedex";

function App() {
  // const [id, setId] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`/:id`} element={<Card />} />
          <Route path={`/`} element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
