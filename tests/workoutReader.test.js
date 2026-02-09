const { calculateWorkouts } = require("./workoutReader");

describe("Workout Reader Tests", () => {
  test("Reads valid CSV and returns correct structure", async () => {
    const result = await calculateWorkouts("./data/workouts.csv");
    expect(result).toHaveProperty("totalWorkouts");
    expect(result).toHaveProperty("totalMinutes");
  });

  test("Throws error for missing CSV file", async () => {
    await expect(calculateWorkouts("./data/missing.csv")).rejects.toThrow();
  });
});
