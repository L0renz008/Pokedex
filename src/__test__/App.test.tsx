// Imports
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// To Test
import Pokedex from "../components/Pokedex";

// Tests
describe("Renders main page correctly", async () => {
  test("Should render the page correctly", async () => {
    // Setup
    render(<Pokedex />);
    const title = screen.findByText(/Pokedex/i);
    // Expectations
    expect(title).not.toBeNull();
  });
  test("Should render the name of a pokemon between 1 to 10 correctly", async () => {
    // Setup
    render(<Pokedex />);
    const span = await screen.findByText(/bulbasaur/i);
    // Expectations
    expect(span).not.toBeNull();
  });
});
