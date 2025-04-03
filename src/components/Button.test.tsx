import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("tests of button", () => {
  it("Should render a button", () => {
    render(<Button>Entrar</Button>);

    screen.getByText("Entrar");
  });
});
