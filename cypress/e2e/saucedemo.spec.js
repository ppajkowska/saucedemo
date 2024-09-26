import { extractNumber } from "../utils/utils";

describe("Saucedemo Page Tests Suite", () => {
  beforeEach("loginToApplication", () => {
    cy.loginToApplication();
  });

  it("Add to cart and remove from cart, Main page", () => {
    cy.getByDataTestId("add-to-cart-sauce-labs-backpack").click();
    cy.getByDataTestId("remove-sauce-labs-backpack").should(
      "contain",
      "Remove"
    );
    cy.get(".shopping_cart_badge").should("contain", "1");
    cy.getByDataTestId("add-to-cart-sauce-labs-bike-light").click();
    cy.getByDataTestId("remove-sauce-labs-bike-light").should(
      "contain",
      "Remove"
    );
    cy.get(".shopping_cart_badge").should("contain", "2");
    cy.getByDataTestId("remove-sauce-labs-bike-light").click();
    cy.get(".shopping_cart_badge").should("contain", "1");
    cy.getByDataTestId("remove-sauce-labs-backpack").click();
    cy.get(".shopping_cart_link").should("not.contain", "1");
  });

  it("Add to cart and remove from cart, Basket", () => {
    cy.getByDataTestId("add-to-cart-sauce-labs-backpack").click();
    cy.getByDataTestId("shopping-cart-link").click();
    cy.getByDataTestId("remove-sauce-labs-backpack").click();
    cy.get(".removed_cart_item");
  });

  it("Make a purchase", () => {
    cy.getByDataTestId("inventory-item-name").eq(0).click();
    cy.getByDataTestId("add-to-cart").click();
    cy.get(".shopping_cart_badge").should("contain", "1");
    cy.getByDataTestId("shopping-cart-link").click();
    cy.getByDataTestId("item-quantity").should("contain", "1");
    cy.getByDataTestId("checkout").click();
    cy.fillInAddress("Jan", "Kowalski", "00-000");
    cy.getByDataTestId("continue").click();
    cy.getByDataTestId("finish").click();
    cy.getByDataTestId("complete-header").then((thankYouMessage) => {
      expect(thankYouMessage).to.contain("Thank you for your order!");
    });
    cy.getByDataTestId("back-to-products").click();
    cy.get(".shopping_cart_link").should("not.contain", "1");
  });

  it("Page sorting", () => {
    cy.getByDataTestId("product-sort-container")
      .as("select")
      .find("option")
      .each((option) => {
        cy.get("@select").select(option.text());
        cy.getByDataTestId("active-option").should("have.text", option.text());
      });
  });

  it("Price summary verification", () => {
    let totalPrice = 0;

    cy.getByDataTestId("add-to-cart-sauce-labs-backpack").click();
    cy.getByDataTestId("inventory-item-description")
      .eq(0)
      .find('[data-test="inventory-item-price"]')
      .then((price1) => {
        totalPrice += Number(extractNumber(price1[0].innerText));
        cy.log(totalPrice);
      });
    cy.getByDataTestId("add-to-cart-sauce-labs-bike-light").click();
    cy.getByDataTestId("inventory-item-description")
      .eq(1)
      .find('[data-test="inventory-item-price"]')
      .then((price2) => {
        totalPrice += Number(extractNumber(price2[0].innerText));
        cy.log(totalPrice);
      });
    cy.getByDataTestId("shopping-cart-link").click();
    cy.getByDataTestId("checkout").click();
    cy.fillInAddress("Jan", "Kowalski", "00-000");
    cy.getByDataTestId("continue").click();
    cy.getByDataTestId("subtotal-label").then((price3) => {
      expect(totalPrice).to.equal(Number(extractNumber(price3[0].innerText)));
    });
  });
});
