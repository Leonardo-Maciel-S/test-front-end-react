import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Form component", () => {
  it("Should render the state initial correctly", () => {
    render(<App />);

    screen.getByText(/digite algo/i);
    screen.getByRole("textbox", { name: "Item" });
    screen.getByRole("button", { name: "Adicionar" });
    screen.getByText(/lista de items/i);
    screen.getByText(/Nenhum item adicionado ainda./i);
  });
});
