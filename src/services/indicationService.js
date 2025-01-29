import Indications  from '../models/Indications.js';
import csvLoader from '../utils/csvLoader.js';

const fillIndicationTable = async () => {
	try {
		const indications = await csvLoader('src/data/movielist.csv');
		indications.map(indication => {
			if (indication.winner === 'yes') indication.winner = true
			else indication.winner = false;
		});

		await Indications.bulkCreate(indications);
	} catch (err) {
		return (err);
	}
}

const formatMultiplesProducersIndications = (indications) => {
	const multiplesProducers = indications.filter(indication => indication.producers.includes(' and '))
	const multiplesProducersIndex = multiplesProducers.map(indication => indications.indexOf(indication));

	multiplesProducers.forEach((indication, index) => {
		const producers = indication.producers.split(/,| and /);
		producers.forEach(producer => {
			indications.push({
				year: indication.year,
				title: indication.title,
				studios: indication.studios,
				producers: producer,
				winner: indication.winner,
			});
		});
	});

	multiplesProducersIndex.reverse().forEach(index => {
		indications.splice(index, 1);
	});

	return indications;
}

const getProducerAwardsIntervals = async () => {
	const winnersIndications = await Indications.findAll({where: { winner: true }});
	const winners = formatMultiplesProducersIndications(winnersIndications)
	const producerWins = {};
	winners.forEach(({ producers, year }) => {
		if (!producerWins[producers]) {
				producerWins[producers] = [];
		}
		producerWins[producers].push(year);
	});

	let minInterval = Infinity
	let maxInterval = -Infinity
	const result = { min: [], max: [] };
  for (const producer in producerWins) {
    const years = producerWins[producer].sort((a, b) => a - b);
    const intervals = years[years.length - 1] - years[0];

		if (intervals <= minInterval && intervals > 0) {
			if (intervals < minInterval) {
				minInterval = intervals;
				result.min = [];
			}
			result.min.push({
				producer,
				interval: intervals,
				previousWin: years[0],
				followingWin: years[years.length - 1],
			});
		}

		if (intervals >= maxInterval && intervals > 0) {
			if (intervals > maxInterval) {
				maxInterval = intervals;
				result.max = [];
			}
			result.max.push({
				producer,
				interval: intervals,
				previousWin: years[0],
				followingWin: years[years.length - 1],
			});
		}
  }

	return result;
}

export { fillIndicationTable, getProducerAwardsIntervals };
