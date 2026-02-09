const fs = require("fs").promises;

async function readHealthData(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw new Error("Error reading or parsing health JSON file.");
  }
}

async function countHealthEntries(filePath) {
  try {
    const data = await readHealthData(filePath);
    return data.length;
  } catch (error) {
    throw error;
  }
}

module.exports = { readHealthData, countHealthEntries };
