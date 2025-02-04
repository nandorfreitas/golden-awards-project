import jwt from 'jsonwebtoken';
import responseHandler from "../utils/responseHandler.js";

const login = async (req, res, next) => {
	const SECRET = process.env.SECRET;
	try {
		const { name } = req.body;

		const token = jwt.sign({ name }, SECRET, { expiresIn: '1h' });

		if (!name || name !== 'userExample') {
			responseHandler({ res, status: 401, message: 'unauthorized' });
		}
    responseHandler({ res, status: 200, message: 'Ok', data: { token } });
  } catch (err) {
    next(err);
  }
}

const verifyToken = (req, res, next) => {
	const SECRET = process.env.SECRET;
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return responseHandler({ res, status: 401, message: err.message });;
    req.user = user;
    next();
  });
}

export { login, verifyToken };
