import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User logins an deletes the box with API", () => {
  cy.request({
    method: "POST",
    url: "/api/login?redirect=%2F",
    body: {
      email: "nekrashevich.k@mail.ru",
      password: "TZ1600",
    },
  }).then((response) => {
    cy.log(JSON.stringify(response));
    expect(response.status).to.eq(200);

    cy.request({
      method: "GET",
      url: "/api/account/boxes",
      headers: {
        Cookie:
          "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE0NDA4MDU3fQ.ceCMNPIOSQJWvpCE2htYK9RruEiZztjNfmzbzne2wbM; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE3MDAwMDU3fQ.KWvALuwXSalJYyR3_ByKjzjDROGW8aO0BgBSfd0ZGiw",
      },
    }).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
      const keyBox = response.body[0].box.key;
      cy.log("box ID is:" + keyBox);

      cy.request({
        method: "DELETE",
        url: "/api/box/" + keyBox,
        headers: {
          Cookie:
            "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE0NDA4MDU3fQ.ceCMNPIOSQJWvpCE2htYK9RruEiZztjNfmzbzne2wbM; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTEyNjEsImlhdCI6MTcxMTgxNjA1NywiZXhwIjoxNzE3MDAwMDU3fQ.KWvALuwXSalJYyR3_ByKjzjDROGW8aO0BgBSfd0ZGiw",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
