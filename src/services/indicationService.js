import Indications  from '../models/Indications.js';
import csvLoader from '../utils/csvLoader.js';

const fillIndicationTable = async () => {
	try {
		const indications = await csvLoader('src/data/movielist.csv');
		await Indications.bulkCreate(indications);
	} catch (err) {
		console.log(err);
	}
}

export { fillIndicationTable };
