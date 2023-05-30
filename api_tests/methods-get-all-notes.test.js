const { spec } = require("pactum");
const { faker } = require("@faker-js/faker");
const getPostsSchema = require("../data/response/get-notes-schema.json");
const generalMethods = require("../data/methods/generalMethods");

const baseURL = "https://practice.expandtesting.com/notes/api";
const totalNumberOfNotes = 5;
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

describe("Get all notes Endpoint Scenarios", () => {
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

    for (let i = 1; i < totalNumberOfNotes; i++) {
      generalMethods.addSingleRandomNote(baseURL, authToken);
    }
  });

  it("Get all notes Positive Test", async () => {
    await spec()
      .get(`${baseURL}/notes`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json",
      })
      .expectBodyContains("Notes successfully retrieved")
      .expectJsonSchema(getPostsSchema)
      .expectStatus(200);
  });
});
