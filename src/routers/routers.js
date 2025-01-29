import express from 'express';
import {
	getAllIndications,
	getMovieIndicationById,
	insertMovieIndication,
	editMovieIndication,
	removeMovieIndication,
	getAwardsIntervals
} from '../controllers/indicationController.js';
import requestValidator from '../middlewares/requestValidator.js';

const router = express.Router();

router.get('/indications/awards-intervals', getAwardsIntervals)
router.get('/indications', getAllIndications)
router.get('/indication/:id', getMovieIndicationById)
router.post('/indication', requestValidator, insertMovieIndication)
router.put('/indication/:id', requestValidator, editMovieIndication)
router.delete('/indication/:id', removeMovieIndication)

export default router;
