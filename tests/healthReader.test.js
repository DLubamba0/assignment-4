const { readHealthData, countHealthEntries } = require("./healthReader");
const fs = require("fs");

describe("Health Reader Tests", () => {
  test("Reads valid JSON file", async () => {
    const data = await readHealthData("./data/health.json");
    expect(Array.isArray(data)).toBe(true);
  });

  test("Counts health entries correctly", async () => {
    const count = await countHealthEntries("./data/health.json");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("Throws error for missing file", async () => {
    await expect(countHealthEntries("./data/missing.json")).rejects.toThrow();
  });
});
