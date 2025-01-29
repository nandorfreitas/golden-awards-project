
import Indications from '../models/Indications.js';
import csvLoader from '../utils/csvLoader.js';
import { fillIndicationTable, getProducerAwardsIntervals } from './indicationService.js';


jest.mock("../models/Indications.js");
jest.mock("../utils/csvLoader.js");

describe('indicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

	describe('fillIndicationTable', () => {
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

		it('should handle empty CSV file', async () => {
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
	});

	describe('getProducerAwardsIntervals', () => {
		it('should return correct intervals for producers with multiple wins', async () => {
      // Mock data with multiple wins for producers
      const mockData = [
        { producers: 'Producer A', year: 2000, winner: true },
        { producers: 'Producer A', year: 2005, winner: true },
        { producers: 'Producer B', year: 2010, winner: true },
        { producers: 'Producer B', year: 2015, winner: true },
        { producers: 'Producer C', year: 2011, winner: true },
        { producers: 'Producer C', year: 2013, winner: true },
      ];
      Indications.findAll.mockResolvedValue(mockData);

      const result = await getProducerAwardsIntervals();

      expect(result).toEqual({
        min: [
          { producer: 'Producer C', interval: 2, previousWin: 2011, followingWin: 2013 },
        ],
        max: [
          { producer: 'Producer A', interval: 5, previousWin: 2000, followingWin: 2005 },
          { producer: 'Producer B', interval: 5, previousWin: 2010, followingWin: 2015 },
        ],
      });
    });

    it('should handle a single producer with one win', async () => {
      // Mock data with a single win for a producer
      const mockData = [
        { producers: 'Producer C', year: 2000, winner: true },
      ];
      Indications.findAll.mockResolvedValue(mockData);

      const result = await getProducerAwardsIntervals();

      expect(result).toEqual({
        min: [],
        max: [],
      });
    });
  });

	it('should handle no winners', async () => {
		const mockData = [];
		Indications.findAll.mockResolvedValue(mockData);

		const result = await getProducerAwardsIntervals();

		expect(result).toEqual({
			min: [],
			max: [],
		});
	});

	it('should handle producer with min and max interval equal', async () => {
		const mockData = [
			{ producers: 'Producer D', year: 1990, winner: true },
			{ producers: 'Producer D', year: 2000, winner: true },
			{ producers: 'Producer D', year: 2010, winner: true },
		];
		Indications.findAll.mockResolvedValue(mockData);

		const result = await getProducerAwardsIntervals();

		expect(result).toEqual({
			min: [
				{ producer: 'Producer D', interval: 20, previousWin: 1990, followingWin: 2010 },
			],
			max: [
				{ producer: 'Producer D', interval: 20, previousWin: 1990, followingWin: 2010 },
			],
		});
	});

	it('should handle multiple producers with overlapping win years', async () => {
		const mockData = [
			{ producers: 'Producer E and Producer F', year: 2000, winner: true },
			{ producers: 'Producer F and Producer H', year: 2000, winner: true },
			{ producers: 'Producer E and Producer C', year: 2005, winner: true },
			{ producers: 'Producer F', year: 2010, winner: true },
		];
		Indications.findAll.mockResolvedValue(mockData);

		const result = await getProducerAwardsIntervals();

		expect(result).toEqual({
			min: [
				{ producer: 'Producer E', interval: 5, previousWin: 2000, followingWin: 2005 },
			],
			max: [
				{ producer: 'Producer F', interval: 10, previousWin: 2000, followingWin: 2010 },
			],
		});
	});
});

