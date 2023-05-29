const { spec } = require("pactum");
const { faker } = require("@faker-js/faker");

const baseURL = "https://practice.expandtesting.com/notes/api";

const randomPassword = faker.internet.password();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomUsername = faker.internet.displayName({
  firstName: randomFirstName,
  lastName: randomLastName,
});
const randomEmail = faker.internet.email({
  firstName: randomFirstName,
  lastName: randomLastName,
});

describe("Create User Endpoint Scenarios", () => {
  it("Register a User Positive Test", async () => {
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

  it("Try Register a User w/o sending the Username - Negative Test", async () => {
    const requestBody = {
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("User name must be between 4 and 30 characters")
      .expectStatus(400);
  });

  it("Try Register a User by sending Username with 3 characters - Negative Test", async () => {
    const requestBody = {
      name: `fbw`,
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("User name must be between 4 and 30 characters")
      .expectStatus(400);
  });

  it("Try Register a User by sending Username with 30 characters - Negative Test", async () => {
    const requestBody = {
      name: `bwrdabwrdabwrdabwrdabwrdabwrdas`,
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    await spec()
      .post(`${baseURL}/users/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("User name must be between 4 and 30 characters")
      .expectStatus(400);
  });
});
