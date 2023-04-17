import { useState } from "react";

import { Routes, Route, useSearchParams, BrowserRouter } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Card />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
