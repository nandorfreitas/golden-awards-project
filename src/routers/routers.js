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
import { login, verifyToken } from '../services/authService.js';

const router = express.Router();

router.post('/login', login);
router.get('/indications/awards-intervals', verifyToken, getAwardsIntervals)
router.get('/indications', verifyToken, getAllIndications)
router.get('/indication/:id', verifyToken, getMovieIndicationById)
router.post('/indication', ((req, res, next) => { verifyToken(req, res, next); requestValidator(req, res, next) }), insertMovieIndication)
router.put('/indication/:id', ((req, res, next) => { verifyToken(req, res, next); requestValidator(req, res, next) }), editMovieIndication)
router.delete('/indication/:id', verifyToken, removeMovieIndication)

export default router;
