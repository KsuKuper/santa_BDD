import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
import { faker } from "@faker-js/faker";


let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let maxAmount = 50;
let currency = "Евро";

Given("User is on Secret Santa login page", () => {
  cy.visit("/login");
});

When("User logins", () => {
  cy.login(users.userAutor.email, users.userAutor.password);
});

Then("User is on dashboard page", () => {
  cy.contains("Создать коробку").click();
});

When("User fills out the box details", () => {
  cy.contains("Придумайте название коробке");
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAnount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.additionSettings).should("be.visible");
  cy.contains("Пожелания по подаркам");
  cy.contains("Почтовый адрес");
  cy.contains("Номер телефона");
  cy.contains("Показывать имена участников");
  cy.get(generalElements.arrowRight).click({ force: true });
});

Then("User is able to interact with participants", () => {
  cy.get(dashboardPage.generalToggle).should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
  cy.get(dashboardPage.participantsToggle).click({ force: true });
});
