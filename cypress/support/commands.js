// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginToApplication", () => {
  cy.visit("/");
  cy.get('[placeholder="Username"]').type("standard_user");
  cy.get('[placeholder="Password"]').type("secret_sauce");
  cy.get("#login-button").click();
});

Cypress.Commands.add("fillInAddress", (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get("#postal-code").type(postalCode);
});

Cypress.Commands.add("getByDataTestId", (dataTestId) => {
  return cy.get(`[data-test=${dataTestId}]`);
});
