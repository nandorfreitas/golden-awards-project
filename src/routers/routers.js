import express from 'express';
import {
	getAllIndications,
} from '../controllers/indicationController.js';

const router = express.Router();

// router.get('/awards-intervals', getAwardsIntervals)
router.get('/indications', getAllIndications)
// router.get('/movie-indication/:id', getMovieIndicationById)
// router.post('/movie-indication', insertMovieIndication)
// router.put('/movie-indication/:id', editMovieIndication)
// router.delete('/movie-indication/:id', removeMovieIndication)

export default router;
