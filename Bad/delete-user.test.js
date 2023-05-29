const { spec } = require("pactum");

const baseURL = "https://reqres.in";
const userId = 2;

describe("Delete User Endpoint Scenarios", () => {
  it("Delete User Positive Test", async () => {
    await spec()
      .delete(`${baseURL}/api/users/${userId}`)
      .expectStatus(204);
  });
});
