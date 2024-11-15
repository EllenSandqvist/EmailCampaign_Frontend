// const testUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://main.d2iuui4uss8fdt.amplifyapp.com"
//     : "http://localhost:5173";

describe("Register page tests", () => {
  it("Verifies register page elements", () => {
    cy.visit("https://main.d2iuui4uss8fdt.amplifyapp.com/register", {
      failOnStatusCode: false,
    });

    cy.get('[id="email"]')
      .should("exist")
      .and("have.attr", "placeholder", "Enter your email");
  });
});

describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://main.d2iuui4uss8fdt.amplifyapp.com");

    cy.get('[data-testid="MarketPro-title"]')
      .should("exist")
      .should("have.text", "MarketPro");

    cy.get('[id="email"]')
      .should("exist")
      .and("have.attr", "placeholder", "name@example.com");
  });
});
