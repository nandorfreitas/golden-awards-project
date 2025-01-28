import fs from 'fs';
import csv from 'csv-parser';
import Indications from '../models/Indications';

async function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await Indications.bulkCreate(
          results.map((row) => ({
            year: row['year'],
            title: row['title'],
            studios: row['studios'],
            producers: row['producers'],
            winner: row['winner'] === 'yes',
          }))
        );
        resolve();
      })
      .on('error', reject);
  });
}

export default loadCSV;
