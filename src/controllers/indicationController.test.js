import Indications from "../models/Indications.js";
import responseHandler from "../utils/responseHandler.js";
import {
	getAllIndications,
	getMovieIndicationById,
	insertMovieIndication,
	editMovieIndication,
	removeMovieIndication,
	getAwardsIntervals
} from './indicationController'
import { getProducerAwardsIntervals } from "../services/indicationService.js";

jest.mock("../models/Indications.js");
jest.mock("../utils/responseHandler.js");
jest.mock("../services/indicationService.js");

const mockIndications = [{ id: 1, year: 2020, title: 'Test', studios: 'Studio A', producers: 'Producer A', winner: true }];
describe('indicationController', () => {
	let req, res, next;

	beforeEach(() => {
		req = {};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		next = jest.fn();
	});

	describe('getAllIndications', () => {
		it('should respond with all indications', async () => {

			Indications.findAll.mockResolvedValue(mockIndications);

			await getAllIndications(req, res, next);

			expect(responseHandler).toHaveBeenCalledWith({
				res,
				status: 200,
				message: 'Ok',
				data: mockIndications,
			});
		});

		it ('should call next with an error if Indications.findAll throws an error', async () => {
			const mockError = new Error('Database error');
			Indications.findAll.mockRejectedValue(mockError);

			await getAllIndications(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});

	describe('getMovieIndicationById', () => {
		it('should respond with the indication with the given id', async () => {
			const mockId = 1;
			const mockIndication = mockIndications[0];
			Indications.findOne.mockResolvedValue(mockIndication);

			req.params = { id: mockId };

			await getMovieIndicationById(req, res, next);

			expect(responseHandler).toHaveBeenCalledWith({
				res,
				status: 200,
				message: 'Ok',
				data: mockIndication,
			});
		});

		it('should call next with an error if Indications.findOne throws an error', async () => {
			const mockId = 1;
			const mockError = new Error('Database error');
			Indications.findOne.mockRejectedValue(mockError);

			req.params = { id: mockId };

			await getMovieIndicationById(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});

	describe('insertMovieIndication', () => {
		it('should respond with the inserted indication', async () => {
			const mockIndication = mockIndications[0];
			Indications.create.mockResolvedValue(mockIndication);

			req.body = mockIndication;

			await insertMovieIndication(req, res, next);

			expect(responseHandler).toHaveBeenCalledWith({
				res,
				status: 201,
				message: 'Indication created successfully',
				data: mockIndication,
			});
		});

		it('should call next with an error if Indications.create throws an error', async () => {
			const mockError = new Error('Database error');
			Indications.create.mockRejectedValue(mockError);

			req.body = mockIndications[0];

			await insertMovieIndication(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});

	describe('editMovieIndication', () => {
		it('should respond with the updated indication', async () => {
			const mockId = 1;
			const mockIndication = mockIndications[0];
			Indications.update.mockResolvedValue(mockIndication);

			req.params = { id: mockId };
			req.body = mockIndication;

			await editMovieIndication(req, res, next);

			expect(responseHandler).toHaveBeenCalledWith({
				res,
				status: 200,
				message: 'Indication updated successfully',
				data: mockIndication,
			});
		});

		it('should call next with an error if Indications.update throws an error', async () => {
			const mockId = 1;
			const mockError = new Error('Database error');
			const mockIndication = mockIndications[0];
			Indications.update.mockRejectedValue(mockError);

			req.body = mockIndication;
			req.params = { id: mockId };

			await editMovieIndication(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});

	describe('removeMovieIndication', () => {
		it('should respond with the number of removed indications', async () => {
			const mockId = 1;
			const mockIndication = 1;
			Indications.destroy.mockResolvedValue(mockIndication);

			req.params = { id: mockId };

			await removeMovieIndication(req, res, next);

			expect(responseHandler).toHaveBeenCalledWith({
				res,
				status: 200,
				message: 'Indication removed successfully',
				data: mockIndication,
			});
		});

		it('should call next with an error if Indications.destroy throws an error', async () => {
			const mockId = 1;
			const mockError = new Error('Database error');
			Indications.destroy.mockRejectedValue(mockError);

			req.params = { id: mockId };

			await removeMovieIndication(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});

	describe('getAwardsIntervals', () => {
		it('should respond with the awards intervals', async () => {
			const mockIntervals = [{ producer: 'Producer A', interval: 2 }];
			getProducerAwardsIntervals.mockResolvedValue(mockIntervals);

			await getAwardsIntervals(req, res, next);

			expect(responseHandler).toHaveBeenCalledWith({
				res,
				status: 200,
				message: 'Ok',
				data: mockIntervals,
			});
		});

		it('should call next with an error if getProducerAwardsIntervals throws an error', async () => {
			const mockError = new Error('Service error');
			getProducerAwardsIntervals.mockRejectedValue(mockError);

			await getAwardsIntervals(req, res, next);

			expect(next).toHaveBeenCalledWith(mockError);
		});
	});
})
