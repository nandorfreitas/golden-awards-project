import fs from 'fs';
import csv from 'csv-parser';

async function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      resolve(results);
    })
    .on('error', reject);
    });
}

export default loadCSV;
