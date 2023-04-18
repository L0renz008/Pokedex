import { useState } from "react";

import { Routes, Route, useSearchParams, BrowserRouter } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import Card from "./components/Card";
import List from "./components/List";

function App() {
  // const [id, setId] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`/:id`} element={<Card />} />
          <Route path={`/`} element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
