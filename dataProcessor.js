require("dotenv").config();

const { countHealthEntries } = require("./healthReader");
const { calculateWorkouts } = require("./workoutReader");

async function processFiles() {
  try {
    const userName = process.env.USER_NAME;
    const weeklyGoal = Number(process.env.WEEKLY_GOAL);

    console.log(`Processing data for: ${userName}`);

    console.log("📁 Reading workout data...");
    const workoutData = await calculateWorkouts("./data/workouts.csv");
    console.log(`Total workouts: ${workoutData.totalWorkouts}`);
    console.log(`Total minutes: ${workoutData.totalMinutes}`);

    console.log("📁 Reading health data...");
    const healthEntries = await countHealthEntries("./data/health.json");
    console.log(`Total health entries: ${healthEntries}`);

    console.log("\n=== SUMMARY ===");
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthEntries}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);

    if (workoutData.totalMinutes >= weeklyGoal) {
      console.log(`🎉 Congratulations ${userName}! You met your weekly goal!`);
    } else {
      console.log(`Keep going ${userName}! You haven't reached your weekly goal yet.`);
    }
  } catch (error) {
    console.error("Error processing files:", error.message);
  }
}

processFiles();
