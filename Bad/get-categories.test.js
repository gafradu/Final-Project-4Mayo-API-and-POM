const { spec } = require("pactum");

const baseURL = "https://practice.expandtesting.com";

describe("Get Categories tests", () => {
  it("Get all Categories Positive Test", async () => {
    await spec()
      .get(`${baseURL}/notes/api/notes`)
      .withHeaders("Content-Type", "application/json")
      .expectStatus(200);

      15e04f7d6d794b40b70f2abd479847818dde18f28e8d452f8f6935ffaaa7e925

  });
});