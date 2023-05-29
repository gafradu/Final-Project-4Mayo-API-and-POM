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

let authToken = " ";
let requestBody = " ";

describe("Create new notes Endpoint Scenarios", () => {
  before(async () => {
    requestBody = {
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

    requestBody = {
      email: `${randomEmail}`,
      password: `${randomPassword}`,
    };

    const resp = await spec()
      .post(`${baseURL}/users/login`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
    .expectBodyContains("Login successful")
    .expectStatus(200);

    authToken = resp.body.data.token;
    console.log(authToken);
  });

  it("Add a new note Positive Test", async () => {
    requestBody = {
      title: "Title only",
      description: "Testing purposes",
      category: "Work",
    };
    
    await spec()
      .post(`${baseURL}/notes`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json"})
      .withBody(requestBody)
      .expectBodyContains("Note successfully created")
      .expectStatus(200);
  });
});
