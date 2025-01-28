import {DataTypes} from 'sequelize';
import sequelize from '../data/dbConnection.js';

const Indications = sequelize.define('Indications', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
	studios: {
		type: DataTypes.STRING,
		allowNull: true,
	},
  producers: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  winner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Indications;
