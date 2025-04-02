const sum = (x: number, y: number) => x + y;

describe("teste", () => {
  it("Should sum number", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
