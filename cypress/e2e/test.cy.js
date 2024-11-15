// const testUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://main.d2iuui4uss8fdt.amplifyapp.com"
//     : "http://localhost:5173";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://main.d2iuui4uss8fdt.amplifyapp.com");

    cy.get('[data-testid="MarketPro-title"]')
      .should("exist")
      .should("have.text", "MarketPro");
  });
});
