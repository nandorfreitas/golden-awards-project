import responseHandler from './responseHandler.js';

const createMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('responseHandler() responseHandler method', () => {
	test('should respond with the correct status, message, and data', () => {

		const res = createMockResponse();
		const status = 200;
		const message = 'Success';
		const data = { id: 1, name: 'Test' };

		responseHandler({ res, status, message, data });

		expect(res.status).toHaveBeenCalledWith(status);
		expect(res.json).toHaveBeenCalledWith({
			status,
			message,
			data,
		});
	});

	test('should respond with null data if data is not provided', () => {
		const res = createMockResponse();
		const status = 200;
		const message = 'Success';

		responseHandler({ res, status, message });

		expect(res.status).toHaveBeenCalledWith(status);
		expect(res.json).toHaveBeenCalledWith({
			status,
			message,
			data: null,
		});
	});
});

// End of unit tests for: responseHandler
