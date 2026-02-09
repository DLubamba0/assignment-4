const fs = require("fs");
const csv = require("csv-parser");

function readWorkoutData(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];

    fs.createReadStream(filePath)
      .on("error", () => reject(new Error("Error reading workout CSV file.")))
      .pipe(csv())
      .on("data", (row) => workouts.push(row))
      .on("end", () => resolve(workouts));
  });
}

async function calculateWorkouts(filePath) {
  try {
    const workouts = await readWorkoutData(filePath);

    let totalMinutes = 0;
    for (let i = 0; i < workouts.length; i++) {
      totalMinutes += Number(workouts[i].minutes);
    }

    return {
      totalWorkouts: workouts.length,
      totalMinutes,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { readWorkoutData, calculateWorkouts };
