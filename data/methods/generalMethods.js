const { spec } = require("pactum");
const { faker } = require("@faker-js/faker");

class generalMethods {
  generateUserData(
    randomFirstName,
    randomLastName,
    randomUsername,
    randomEmail,
    randomPassword
  ) {
    randomFirstName = faker.person.firstName();
    randomLastName = faker.person.lastName();
    randomUsername = faker.internet.userName({
      firstName: randomFirstName,
      lastName: randomLastName,
    });

    randomEmail = faker.internet.email({
      firstName: randomFirstName,
      lastName: randomLastName,
    });
    randomPassword = faker.internet.password();
  }

  async addSingleRandomNote(baseURL, authToken) {
    requestBody = {
      title: faker.lorem.word({ length: { min: 4, max: 10 } }),
      description: faker.lorem.sentence({ min: 10, max: 50 }),
      category: faker.helpers.arrayElement(["Home", "Work", "Personal"], 1),
    };

    await spec()
      .post(`${baseURL}/notes`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json",
      })
      .withBody(requestBody)
      .expectBodyContains("Note successfully created")
      .expectStatus(200);
  }
}

module.exports = generalMethods;
