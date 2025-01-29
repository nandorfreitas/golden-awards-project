import Joi from 'joi';

const indicationSchema = Joi.object({
	year: Joi.number().required(),
	title: Joi.string().min(3).required(),
	studios: Joi.string().min(3).required(),
	producers: Joi.string().min(3).required(),
	winner: Joi.boolean()
});

const requestValidator = (req, res, next) => {
	console.log(req,'requestValidator');
	const { error } = indicationSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ status: 400, message: error.details[0].message });
	}
	next();
}

export default requestValidator;
