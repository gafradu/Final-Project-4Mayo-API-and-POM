const { spec } = require("pactum");

const baseURL = "https://reqres.in";
const userId = "2";

describe("Update User Endpoint Scenarios", () => {
  it("Positive Flow", async () => {
    const requestBody = {
      name: "Raducu",
      job: "Jobless",
    };

    await spec()
      .put(`${baseURL}/api/users/${userId}`)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectBodyContains("Raducu")
      .expectStatus(200);
  });
});