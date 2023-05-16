// Imports
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// To Test
import Pokedex from "../components/Pokedex";

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<Pokedex />);
    const h1 = await screen.findByText("Pokedex");
    // Expectations
    expect(h1).not.toBeNull();
  });
  it("Should render the name of the pokemon correctly", async () => {
    // Setup
    render(<Pokedex />);
    const span = await screen.findByText("#0009");
    // Expectations
    expect(span).not.toBeNull();
  });
});
