const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");

import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  it("user logins and creates a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.contains("Дополнительные настройки");
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.generalToggle)
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
    cy.get(dashboardPage.participantsToggle).click();
  });

  it("add participants", () => {
    cy.contains("Добавить участников");
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click({ force: true });
    cy.login(users.user1.email, users.user1.password);

    cy.createMembersCard();

    cy.clearCookies();
  });

  it("approve as user2", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click({ force: true });
    cy.login(users.user2.email, users.user2.password);

    cy.createMembersCard();

    cy.clearCookies();
  });

  it("approve as user3", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click({ force: true });
    cy.login(users.user3.email, users.user3.password);

    cy.createMembersCard();

    cy.clearCookies();
  });

  it("draw lots", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(dashboardPage.boxes).click();
    cy.contains(newBoxName).should("be.visible").click();
    cy.contains("Участников: 3");
    cy.contains("Перейти к жеребьевке").click();
    cy.contains("Провести жеребьевку")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Да, провести жеребьевку").click({ force: true });
    cy.contains("Жеребьевка проведена");
  });
//   it("API", () => {
//     cy.request({
//       method: "POST",
//       url: "/api/login?redirect=%2F",
//       body: {
//         email: "nekrashevich.k@mail.ru",
//         password: "TZ1600",
//       },
//     }).then((response) => {
//       cy.log(JSON.stringify(response));
//       expect(response.status).to.eq(200);

//       cy.request({
//         method: "GET",
//         url: "/api/account/boxes",
//         headers: {
//           Cookie:
//             "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE0NDA4MDU3fQ.ceCMNPIOSQJWvpCE2htYK9RruEiZztjNfmzbzne2wbM; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE3MDAwMDU3fQ.KWvALuwXSalJYyR3_ByKjzjDROGW8aO0BgBSfd0ZGiw",
//         },
//       }).then((response) => {
//         cy.log(JSON.stringify(response));
//         expect(response.status).to.eq(200);
//         const keyBox = response.body[0].box.key;
//         cy.log("box ID is:" + keyBox);

//         cy.request({
//           method: "DELETE",
//           url: "/api/box/" + keyBox,
//           headers: {
//             Cookie:
//               "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE0NDA4MDU3fQ.ceCMNPIOSQJWvpCE2htYK9RruEiZztjNfmzbzne2wbM; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE3MDAwMDU3fQ.KWvALuwXSalJYyR3_ByKjzjDROGW8aO0BgBSfd0ZGiw",
//           },
//         }).then((response) => {
//           expect(response.status).to.eq(200);
//         });
//       });
//     });
//   });
// });

  after("remove the box", () => {
    cy.get(boxPage.boxSettings).click();

    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(boxPage.inputDelete).type("Удалить коробку");
    cy.get(".btn-service").click();
  });
});
