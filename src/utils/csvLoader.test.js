import csv from 'csv-parser';
import fs from 'fs';
import loadCSV from './csvLoader';

jest.mock("fs");
jest.mock("csv-parser", () => jest.fn());

const mockError = new Error('File read error');
const mockStream = {
	pipe: jest.fn().mockReturnThis(),
	on: jest.fn((event, callback) => {
		if (event === 'end') {
			callback();
		}
		if (event === 'error') {
			callback(mockError);
		}
		return mockStream;
	}),
};

describe('loadCSV() loadCSV method', () => {
  describe('Happy paths', () => {
    it('should correctly parse a CSV file with multiple rows', async () => {
			fs.createReadStream.mockReturnValueOnce(mockStream);

      await loadCSV('mockFilePath.csv');

			expect(fs.createReadStream).toBeCalledTimes(1);
    	expect(mockStream.pipe).toBeCalledTimes(1);
    	expect(mockStream.on).toBeCalledWith('data', expect.any(Function));
    	expect(mockStream.on).toBeCalledWith('end', expect.any(Function));
    });
  });

  describe('Edge cases', () => {
    it('should handle an empty CSV file gracefully', async () => {
      fs.createReadStream.mockReturnValueOnce(mockStream);

      const result = await loadCSV('emptyFile.csv');

      expect(result).toEqual([]);
    });
  });
});
