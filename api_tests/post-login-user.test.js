const { spec } = require("pactum");
const { faker } = require("@faker-js/faker");

const baseURL = "https://practice.expandtesting.com/notes/api";

const randomPassword = faker.internet.password();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomUsername = faker.internet.userName({
  firstName: randomFirstName,
  lastName: randomLastName,
});

const randomEmail = faker.internet.email({
  firstName: randomFirstName,
  lastName: randomLastName,
});

describe("Create User Endpoint Scenarios", () => {
  before("Register a User Positive Test", async () => {
    const requestBody = {
      name: `${randomUsername}`,
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("User account created successfully")
      .expectStatus(201);
  });

  it("Login with the User Positive Test", async () => {
    const requestBody = {
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/login`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("Login successful")
      .expectStatus(200);
  });
});
