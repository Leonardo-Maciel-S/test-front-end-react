import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { expect } from "vitest";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

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

const mock = new AxiosMockAdapter(axios);

describe("App component", () => {
  it("Should render the state initial correctly no items", async () => {
    mock
      .onGet("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .reply(200, []);

    render(<App />);

    screen.getByText(/digite algo/i);
    screen.getByRole("textbox", { name: "Item" });
    screen.getByRole("button", { name: "Adicionar" });
    screen.getByText(/lista de items/i);

    await screen.findByText("Nenhum item adicionado ainda.");
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

  it("Should render the state initial correctly with 3 items", async () => {
    const returnAPI = [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
      },
    ];

    mock
      .onGet("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .reply(200, returnAPI);

    render(<App />);

    screen.getByText(/digite algo/i);
    screen.getByRole("textbox", { name: "Item" });
    screen.getByRole("button", { name: "Adicionar" });
    screen.getByText(/lista de items/i);

    await screen.findByText(returnAPI[0].title);

    screen.getByText(returnAPI[1].title);
    screen.getByText(returnAPI[2].title);
  });
});
