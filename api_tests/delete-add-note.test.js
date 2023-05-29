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
let noteId = " ";
let requestBody = " ";

describe("Delete Note Endpoint Scenarios", () => {
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

    let resp = await spec()
      .post(`${baseURL}/users/login`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
    .expectBodyContains("Login successful")
    .expectStatus(200);

    authToken = resp.body.data.token;
    console.log(authToken);

    requestBody = {
      title: "Title only",
      description: "Testing purposes",
      category: "Work",
    };
    
    resp = await spec()
      .post(`${baseURL}/notes`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json"})
      .withBody(requestBody)
      .expectBodyContains("Note successfully created")
      .expectStatus(200);

    noteId = resp.body.data.id;
    console.log(noteId);
  });

  it("Delete the previosuly created note Positive Test", async () => {
    requestBody = {
      title: "Title only",
      description: "Testing purposes",
      category: "Work",
    };
    
    await spec()
      .delete(`${baseURL}/notes/${noteId}`)
      .withHeaders({
        "x-auth-token": `${authToken}`,
        "Content-Type": "application/json"})
      .expectBodyContains("Note successfully deleted")
      .expectStatus(200);
  });
});
