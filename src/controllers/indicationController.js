import responseHandler from "../utils/responseHandler.js";
import Indications from "../models/Indications.js";
import { getProducerAwardsIntervals } from "../services/indicationService.js";

const getAllIndications = async (req, res, next) => {
  try {
    const allIndications = await Indications.findAll();
    responseHandler({ res, status: 200, message: 'Ok', data: allIndications });
  } catch (err) {
    next(err);
  }
}

const getMovieIndicationById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const indication = await Indications.findOne({ where: { id } });
		responseHandler({ res, status: 200, message: 'Ok', data: indication });
	} catch (err) {
		next(err);
	}
}

const insertMovieIndication = async (req, res, next) => {
	try {
		const { year, title, studios, producers, winner } = req.body;
		const newIndication = await Indications.create({ year, title, studios, producers, winner });
		responseHandler({ res, status: 201, message: 'Indication created successfully', data: newIndication });
	} catch (err) {
		next(err);
	}
}

const editMovieIndication = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { year, title, studios, producers, winner } = req.body;
		await Indications.update({ year, title, studios, producers, winner }, { where: { id } });
		responseHandler({ res, status: 200, message: 'Indication updated successfully' });
	} catch (err) {
		next(err);
	}
}

const removeMovieIndication = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Indications.destroy({ where: { id } });
		responseHandler({ res, status: 200, message: 'Indication removed successfully' });
	} catch (err) {
		next(err);
	}
}

const getAwardsIntervals = async (req, res, next) => {
	try {
		const intervals = await getProducerAwardsIntervals();
		responseHandler({ res, status: 200, message: 'Ok', data: intervals });
	} catch (err) {
		next(err);
	}
}

export { getAllIndications, getMovieIndicationById, insertMovieIndication, editMovieIndication, removeMovieIndication, getAwardsIntervals }
