import jwt from 'jsonwebtoken';
import responseHandler from "../utils/responseHandler.js";

const SECRET = process.env.SECRET; // should be stored in a .env file
const login = async (req, res, next) => {
	try {
		const { name } = req.body;

		const token = jwt.sign({ name }, SECRET, { expiresIn: '1h' });
		if (!name || name !== 'userExample') {
			responseHandler({ res, status: 401, message: 'unauthorized' });
		}
    responseHandler({ res, status: 200, message: 'Ok', data: { token} });
  } catch (err) {
    next(err);
  }
}

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export { login, verifyToken };
