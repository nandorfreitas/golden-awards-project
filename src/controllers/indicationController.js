import responseHandler from "../middlewares/responseHandler.js";
import errorHandler from "../middlewares/errorHandler.js";
import Indications from "../models/Indications.js";

const getAllIndications = async (req, res) => {
  try {
    const allIndications = await Indications.findAll();
    responseHandler({ res, status: 200, message: 'Indication created', data: allIndications });
  } catch (err) {
    errorHandler({err, res});
  }
}

export { getAllIndications }
