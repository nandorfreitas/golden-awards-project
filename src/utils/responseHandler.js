const responseHandler = ({res, status, message, data = null}) => {
	return res.status(status).json({
			status,
			message,
			data
	});
}

export default responseHandler;
