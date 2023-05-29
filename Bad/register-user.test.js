const { spec } = require("pactum");

const baseURL = "https://reqres.in";

const requestBodyEmail = {
  email: "eve.holt@reqres.in",
};

const requestBodyPassword = {
  password: "cityslicka",
};

describe("Register Endpoint Scenarios", () => {
  it("Try to login w/o entering the Email", async () => {
    await spec()
      .post(`${baseURL}/api/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyPassword)
      .expectStatus(400)
      .expectBodyContains("Missing email or username");
  });

  it("Try to login w/o entering the Password", async () => {
    await spec()
      .post(`${baseURL}/api/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBodyEmail)
      .expectStatus(400)
      .expectBodyContains("Missing password");
  });

  it("Try to register a User which cannot be found", async () => {
    const userNotFoundBody = {
      email: "asda",
      password: "tneteqefqf",
    };
    await spec()
      .post(`${baseURL}/api/login`)
      .withHeaders("Content-Type", "application/json")
      .withBody(userNotFoundBody)
      .expectStatus(400)
      .expectBodyContains("user not found");
  });

  it("Register a correct user Positive Test", async () => {
    await spec()
      .post(`${baseURL}/api/register`)
      .withHeaders("Content-Type", "application/json")
      .withBody(Object.assign(requestBodyEmail, requestBodyPassword))
      .expectBodyContains("token")
      .expectStatus(200);
  });
});
