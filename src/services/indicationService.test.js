
import Indications from '../models/Indications.js';
import csvLoader from '../utils/csvLoader.js';
import { fillIndicationTable } from './indicationService.js';


jest.mock("../models/Indications.js");
jest.mock("../utils/csvLoader.js");

describe('fillIndicationTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    it('should successfully load data from CSV and bulk create indications', async () => {
      const mockIndications = [
        { title: 'Movie 1', genre: 'Action' },
        { title: 'Movie 2', genre: 'Comedy' },
      ];
      csvLoader.mockResolvedValue(mockIndications);
      Indications.bulkCreate.mockResolvedValue();

      await fillIndicationTable();

      expect(csvLoader).toHaveBeenCalledWith('src/data/movielist.csv');
      expect(Indications.bulkCreate).toHaveBeenCalledWith(mockIndications);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty CSV file gracefully', async () => {
      csvLoader.mockResolvedValue([]);
      Indications.bulkCreate.mockResolvedValue();

      await fillIndicationTable();

      expect(csvLoader).toHaveBeenCalledWith('src/data/movielist.csv');
      expect(Indications.bulkCreate).toHaveBeenCalledWith([]);
    });

    it('should handle csvLoader throwing an error', async () => {
      const mockError = new Error('Failed to load CSV');
      csvLoader.mockRejectedValue(mockError);

      await fillIndicationTable();

      expect(csvLoader).toHaveBeenCalledWith('src/data/movielist.csv');
      expect(Indications.bulkCreate).not.toHaveBeenCalled();
    });

    it('should handle bulkCreate throwing an error', async () => {
      const mockIndications = [
        { title: 'Movie 1', genre: 'Action' },
        { title: 'Movie 2', genre: 'Comedy' },
      ];
      csvLoader.mockResolvedValue(mockIndications);

      const mockError = new Error('Failed to create indications');
      Indications.bulkCreate.mockRejectedValue(mockError);

      await fillIndicationTable();

      expect(csvLoader).toHaveBeenCalledWith('src/data/movielist.csv');
      expect(Indications.bulkCreate).toHaveBeenCalledWith(mockIndications);
    });
  });
});

