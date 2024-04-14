import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
const users = require("../../fixtures/users.json");

let inviteLink;

Given("User is on the invite page", () => {
  cy.contains("Добавить участников");
});
When("User clicks the {string} button", (buttonText) => {
  cy.get(generalElements.submitButton).click();
});
Then("User should get an invite link", () => {
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
  cy.clearCookies();
});

Given("User1 received an invite link", () => {
  cy.visit(inviteLink);
});

When("User1 visits the invite link", () => {
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click({ force: true });
});

When("User1 logins", () => {
  cy.login(users.user1.email, users.user1.password);
});

Then("User1 should be able to create members card", () => {
  cy.createMembersCard();
  cy.clearCookies();
});

Given("User2 received an invite link", () => {
  cy.visit(inviteLink);
});

When("User2 visits the invite link", () => {
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click({ force: true });
});

When("User2 logins", () => {
  cy.login(users.user2.email, users.user2.password);
});

Then("User2 should be able to create members card", () => {
  cy.createMembersCard();
  cy.clearCookies();
});

Given("User3 received an invite link", () => {
  cy.visit(inviteLink);
});

When("User3 visits the invite link", () => {
  cy.get(generalElements.submitButton).click();
  cy.contains("войдите").click({ force: true });
});

When("User3 logins", () => {
  cy.login(users.user3.email, users.user3.password);
});

Then("User3 should be able to create members card", () => {
  cy.createMembersCard();
  cy.clearCookies();
});
