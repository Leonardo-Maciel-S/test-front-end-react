import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { expect } from "vitest";

const addItem = async (item: string) => {
  const user = userEvent.setup();

  const input = screen.getByRole("textbox", { name: "Item" });
  const submitButton = screen.getByRole("button", { name: "Adicionar" });

  await user.type(input, item);
  await user.click(submitButton);

  const li = screen.getByRole("listitem");
  expect(li).toHaveTextContent(item);

  return user;
};

describe("App component", () => {
  it("Should render the state initial correctly", () => {
    render(<App />);

    screen.getByText(/digite algo/i);
    screen.getByRole("textbox", { name: "Item" });
    screen.getByRole("button", { name: "Adicionar" });
    screen.getByText(/lista de items/i);

    screen.getByText("Nenhum item adicionado ainda.");
  });

  it("Should add an item to the list and remove it", async () => {
    render(<App />);
    const itemText = "teste";
    const user = await addItem(itemText);

    const deleteButton = screen.getByRole("button", { name: "delete item 0" });
    await user.click(deleteButton);

    const item = screen.queryByText(/`${itemText}`/i);

    expect(item).toBeNull();
  });
});
